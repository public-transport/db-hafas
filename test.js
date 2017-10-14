'use strict'

const test = require('tape-promise').default(require('tape'))
const isRoughlyEqual = require('is-roughly-equal')
const stations = require('db-stations').full
const floor = require('floordate')
const hafas = require('.')



// helpers

const findStation = (id) => {
	return new Promise((yay, nay) => {
		stations()
		.on('error', nay)
		.on('data', (s) => {
			if (s.id === id) yay(s)
			if (s.additionalIds && s.additionalIds.some(_ => _ === id)) yay(s)
		})
		.on('end', () => yay())
	})
}

const assertValidStation = (t, s) => {
	t.equal(s.type, 'station')
	t.equal(typeof s.id, 'string')
	t.equal(typeof s.name, 'string')
	t.ok(s.coordinates)
	t.equal(typeof s.coordinates.latitude, 'number')
	t.equal(typeof s.coordinates.longitude, 'number')
}

const assertValidPoi = (t, p) => {
	t.equal(p.type, 'poi')
	t.equal(typeof p.id, 'string')
	t.equal(typeof p.name, 'string')
	t.ok(p.coordinates)
	t.equal(typeof p.coordinates.latitude, 'number')
	t.equal(typeof p.coordinates.longitude, 'number')
}

const assertValidAddress = (t, a) => {
	t.equal(a.type, 'address')
	t.equal(typeof a.name, 'string')
	t.ok(a.coordinates)
	t.equal(typeof a.coordinates.latitude, 'number')
	t.equal(typeof a.coordinates.longitude, 'number')
}

const assertValidLocation = (t, l) => {
	t.equal(typeof l.type, 'string')
	if (l.type === 'station') assertValidStation(t, l)
	else if (l.type === 'poi') assertValidPoi(t, l)
	else if (l.type === 'address') assertValidAddress(t, l)
	else t.fail('invalid type ' + l.type)
}

const isValidMode = (m) =>
	   m === 'walking'
	|| m === 'train'
	|| m === 'bus'
	|| m === 'ferry'

const assertValidLine = (t, l) => {
	t.equal(l.type, 'line')
	t.equal(typeof l.name, 'string')
	t.ok(isValidMode(l.mode))
	t.equal(typeof l.product, 'string')
}

const isValidDateTime = (w) => !Number.isNaN(+new Date(w))

const assertValidStopover = (t, s) => {
	if ('arrival' in s) t.ok(isValidDateTime(s.arrival))
	if ('departure' in s) t.ok(isValidDateTime(s.departure))
	if (!('arrival' in s) && !('departure' in s)) {
		t.fail('stopover doesn\'t contain arrival or departure')
	}
	t.ok(s.station)
	assertValidStation(t, s.station)
}

const isJungfernheide = (s) =>
	s.type === 'station' &&
	s.id === '8011167' &&
	s.name === 'Berlin Jungfernheide' &&
	s.coordinates &&
	isRoughlyEqual(s.coordinates.latitude, 52.530408, .0005) &&
	isRoughlyEqual(s.coordinates.longitude, 13.299424, .0005)

const assertIsJungfernheide = (t, s) => {
	t.equal(s.type, 'station')
	t.equal(s.id, '8011167')
	t.equal(s.name, 'Berlin Jungfernheide')
	t.ok(s.coordinates)
	t.ok(isRoughlyEqual(s.coordinates.latitude, 52.530408, .0005))
	t.ok(isRoughlyEqual(s.coordinates.longitude, 13.299424, .0005))
}

const assertIsMünchenHbf = (s) => {
	t.equal(s.type, 'station')
	t.equal(s.id, '8000261')
	t.equal(s.name, 'München Hbf')
	t.ok(s.coordinates)
	t.equal(s.coordinates.latitude, 48.140229)
	t.equal(s.coordinates.longitude, 11.558339)
}



// fixtures

const minute = 60 * 1000
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day
// next Monday
const when = new Date(+floor(new Date(), 'week') + week + 10 * hour)

const isValidWhen = (w) => {
	const d = new Date(w)
	if (Number.isNaN(+d)) return false
	return isRoughlyEqual(10 * hour, +when, d)
}



test('Berlin Jungfernheide to München Hbf', async (t) => {
	// Berlin Jungfernheide to München Hbf
	const journeys = await hafas.journeys('8011167', '8000261', {
		when, passedStations: true
	})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length > 0, 'no journeys')
	for (let journey of journeys) {
		assertValidStation(t, journey.origin)
		if (!await findStation(journey.origin.id)) {
			console.error('unknown station', journey.origin.id, journey.origin.name)
		}
		t.ok(isValidWhen(journey.departure))

		assertValidStation(t, journey.destination)
		if (!await findStation(journey.origin.id)) {
			console.error('unknown station', journey.destination.id, journey.destination.name)
		}
		t.ok(isValidWhen(journey.arrival))

		t.ok(Array.isArray(journey.parts))
		t.ok(journey.parts.length > 0, 'no parts')
		const part = journey.parts[0]

		assertValidStation(t, part.origin)
		if (!await findStation(part.origin.id)) {
			console.error('unknown station', part.origin.id, part.origin.name)
		}
		t.ok(isValidWhen(part.departure))
		t.equal(typeof part.departurePlatform, 'string')

		assertValidStation(t, part.destination)
		if (!await findStation(part.destination.id)) {
			console.error('unknown station', part.destination.id, part.destination.name)
		}
		t.ok(isValidWhen(part.arrival))
		t.equal(typeof part.arrivalPlatform, 'string')

		assertValidLine(t, part.line)

		t.ok(Array.isArray(part.passed))
		for (let stopover of part.passed) assertValidStopover(t, stopover)
	}

	t.end()
})



test('Berlin Jungfernheide to Torfstraße 17', async (t) => {
	// Berlin Jungfernheide to Torfstraße 17
	const journeys = await hafas.journeys('8011167', {
		type: 'address', name: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.origin)
	if (!await findStation(part.origin.id)) {
		console.error('unknown station', part.origin.id, part.origin.name)
	}
	t.ok(isValidWhen(part.departure))
	t.ok(isValidWhen(part.arrival))

	const d = part.destination
	assertValidAddress(t, d)
	t.equal(d.name, 'Torfstraße 17')
	t.ok(isRoughlyEqual(.0001, d.coordinates.latitude, 52.5416823))
	t.ok(isRoughlyEqual(.0001, d.coordinates.longitude, 13.3491223))

	t.end()
})



test('Berlin Jungfernheide to ATZE Musiktheater', async (t) => {
	// Berlin Jungfernheide to ATZE Musiktheater
	const journeys = await hafas.journeys('8011167', {
		type: 'poi', name: 'ATZE Musiktheater', id: '991598902',
		latitude: 52.542417, longitude: 13.350437
	}, {when})

	t.ok(Array.isArray(journeys))
	t.ok(journeys.length >= 1, 'no journeys')
	const journey = journeys[0]
	const part = journey.parts[journey.parts.length - 1]

	assertValidStation(t, part.origin)
	if (!await findStation(part.origin.id)) {
		console.error('unknown station', part.origin.id, part.origin.name)
	}
	t.ok(isValidWhen(part.departure))
	t.ok(isValidWhen(part.arrival))

	const d = part.destination
	assertValidPoi(t, d)
	t.equal(d.name, 'ATZE Musiktheater')
	t.ok(isRoughlyEqual(.0001, d.coordinates.latitude, 52.542399))
	t.ok(isRoughlyEqual(.0001, d.coordinates.longitude, 13.350402))

	t.end()
})



test('departures at Berlin Jungfernheide', async (t) => {
	// Berlin Jungfernheide
	const deps = await hafas.departures('8011167', {
		duration: 5, when
	})

	t.ok(Array.isArray(deps))
	for (let dep of deps) {
		assertValidStation(t, dep.station)
		if (!await findStation(dep.station.id)) {
			console.error('unknown station', dep.station.id, dep.station.name)
		}
		t.ok(isValidWhen(dep.when))
	}

	t.end()
})



test('nearby Berlin Jungfernheide', async (t) => {
	// Berlin Jungfernheide
	const nearby = await hafas.nearby(52.530273, 13.299433, {
		results: 2, distance: 400
	})

	t.ok(Array.isArray(nearby))
	t.equal(nearby.length, 2)

	assertIsJungfernheide(t, nearby[0])
	t.ok(nearby[0].distance >= 0)
	t.ok(nearby[0].distance <= 100)

	t.end()
})



test('locations named Jungfernheide', async (t) => {
	const locations = await hafas.locations('Jungfernheide', {
		results: 10
	})

	t.ok(Array.isArray(locations))
	t.ok(locations.length > 0)
	t.ok(locations.length <= 10)

	for (let location of locations) assertValidLocation(t, location)
	t.ok(locations.find(isJungfernheide))

	t.end()
})
