'use strict'

const test = require('tape-co').default
const isRoughlyEqual = require('is-roughly-equal')
const stations = require('db-stations')
const moment = require('moment-timezone')
const hafas = require('.')



// helpers

const findStation = (id) =>
	new Promise((yay, nay) => {
		stations().on('error', nay)
		.on('data', (s) => {
			if (s.id === id + '') yay(s)
		})
		.on('end', () => yay())
	})

const assertValidStation = (t, s) => {
	t.equal(s.type, 'station')
	t.equal(typeof s.id, 'number')
	t.equal(typeof s.name, 'string')
	t.equal(typeof s.latitude, 'number')
	t.equal(typeof s.longitude, 'number')
	if ('platform' in s) t.equal(typeof s.platform, 'string')
}

const assertValidPoi = (t, p) => {
	t.equal(p.type, 'poi')
	t.equal(typeof p.id, 'number')
	t.equal(typeof p.name, 'string')
	t.equal(typeof p.latitude, 'number')
	t.equal(typeof p.longitude, 'number')
}

const assertValidAddress = (t, p) => {
	t.equal(p.type, 'address')
	t.equal(typeof p.name, 'string')
	t.equal(typeof p.latitude, 'number')
	t.equal(typeof p.longitude, 'number')
}

const assertValidLocation = (t, l) => {
	t.equal(typeof l.type, 'string')
	if (l.type === 'station') assertValidStation(t, l)
	else if (l.type === 'poi') assertValidPoi(t, l)
	else if (l.type === 'address') assertValidAddress(t, l)
	else t.fail('invalid type ' + l.type)
}

const assertValidLine = (t, l) => {
	t.equal(typeof l.name, 'string')
	// t.equal(typeof l.nr, 'number') // todo
	t.equal(typeof l.class, 'number')
	t.equal(typeof l.productCode, 'number')
	t.equal(typeof l.productName, 'string')
}

const assertValidStop = (t, s) => {
	if ('arrival' in s) t.ok(s.arrival instanceof Date)
	if ('departure' in s) t.ok(s.departure instanceof Date)
	if (!('arrival' in s) && !('departure' in s))
		t.fail('stop doesn\'t contain arrival or departure')
	assertValidStation(t, s.station)
}

const isJungfernheide = (s) =>
	s.type === 'station' &&
	s.id === 8011167 &&
	s.name === 'Berlin Jungfernheide' &&
	isRoughlyEqual(s.latitude, 52.530408, .0005) &&
	isRoughlyEqual(s.longitude, 13.299424, .0005)

const assertIsJungfernheide = (t, s) => {
	t.equal(s.type, 'station')
	t.equal(s.id, 8011167)
	t.equal(s.name, 'Berlin Jungfernheide')
	t.ok(isRoughlyEqual(s.latitude, 52.530408, .0005))
	t.ok(isRoughlyEqual(s.longitude, 13.299424, .0005))
}

const assertIsMünchenHbf = (s) => {
	t.equal(s.type, 'station')
	t.equal(s.id, 8000261)
	t.equal(s.name, 'München Hbf')
	t.equal(s.latitude, 48.140229)
	t.equal(s.longitude, 11.558339)
}



// fixtures

const when = moment(Date.now()).tz('Europe/Berlin').startOf('day').hours(8).toDate()
const minute = 60 * 1000
const hour = 60 * minute
const validWhen = isRoughlyEqual(10 * hour, +when)



test('Berlin Jungfernheide to München Hbf', function* (t) {
	// Berlin Jungfernheide to München Hbf
	const journeys = yield hafas.journeys(8011167, 8000261, {
		when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		assertValidStation(t, journey.from)
		// t.ok(yield findStation(journey.from.id))
		t.ok(validWhen(journey.start))

		assertValidStation(t, journey.to)
		// t.ok(yield findStation(journey.from.id))
		t.ok(validWhen(journey.end))

		t.ok(Array.isArray(journey.parts))
		t.ok(journey.parts.length > 0, 'no parts')
		const part = journey.parts[0]

		assertValidStation(t, part.from)
		// t.ok(yield findStation(part.from.id))
		t.ok(validWhen(part.start))

		assertValidStation(t, part.to)
		// t.ok(yield findStation(part.to.id))
		t.ok(validWhen(part.end))

		assertValidLine(t, part.product)

		t.ok(Array.isArray(part.passed))
		for (let stop of part.passed) assertValidStop(t, stop)
	}
})



test('Berlin Jungfernheide to Torfstraße 17', function* (t) {
	// Berlin Jungfernheide to Torfstraße 17
	const journeys = yield hafas.journeys(8011167, {
		type: 'address', name: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.from)
	// t.ok(yield findStation(part.from.id))
	t.ok(validWhen(part.start))

	assertValidAddress(t, part.to)
	t.equal(part.to.name, 'Torfstraße 17')
	t.ok(isRoughlyEqual(.0001, part.to.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, part.to.longitude, 13.3491223))
	t.ok(validWhen(part.end))
})



test('Berlin Jungfernheide to ATZE Musiktheater', function* (t) {
	// Berlin Jungfernheide to ATZE Musiktheater
	const journeys = yield hafas.journeys(8011167, {
		type: 'poi', name: 'ATZE Musiktheater', id: 990363204,
		latitude: 52.543333, longitude: 13.351686
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1)
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.from)
	// t.ok(yield findStation(part.from.id))
	t.ok(validWhen(part.start))

	assertValidPoi(t, part.to)
	t.equal(part.to.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, part.to.latitude, 52.543333))
	t.ok(isRoughlyEqual(.0001, part.to.longitude, 13.351686))
	t.ok(validWhen(part.end))
})



test('departures at Berlin Jungfernheide', function* (t) {
	// Berlin Jungfernheide
	const deps = yield hafas.departures(8011167, {
		duration: 5, when
	})

	t.ok(Array.isArray(deps))
	for (let dep of deps) {
		assertValidStation(t, dep.station)
		// t.ok(yield findStation(dep.station.id))
		t.ok(validWhen(dep.when))
	}
})



test('nearby Berlin Jungfernheide', function* (t) {
	// Berlin Jungfernheide
	const nearby = yield hafas.nearby(52.530273, 13.299433, {
		results: 2, distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsJungfernheide(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)
})



test('locations named Jungfernheide', function* (t) {
	const locations = yield hafas.locations('Jungfernheide', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let location of locations) assertValidLocation(t, location)
	t.ok(locations.find(isJungfernheide))
})
