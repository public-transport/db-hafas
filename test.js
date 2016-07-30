#!/usr/bin/env node
'use strict'

const so = require('so')
const ok = require('assert').ok
const eql = require('assert').strictEqual
const isRoughlyEqual = require('is-roughly-equal')
const stations = require('db-stations')
const floor = require('floordate')
const hafas = require('./index.js')



// helpers

const roughlyEql = (...args) => a.ok(isRoughlyEqual(...args))

const test = (fn) => {
	so(fn)().catch((err) => {
		console.error(err.stack || err.message)
		process.exit(1)
	})
}

const findStation = (name) => new Promise((yay, nay) => {
	let resolved = false
	stations().on('error', nay)
	.on('data', (station) => {
		if (station.name === name) {
			yay(station)
			resolved = true
		}
	})
	.on('end', () => {if (!resolved) nay()})
})

const validStation = (s) =>
	   s.type === 'station'
	&& 'number' === typeof s.id
	&& 'string' === typeof s.name
	&& 'number' === typeof s.latitude
	&& 'number' === typeof s.longitude

const validPoi = (p) =>
	   p.type === 'poi'
	&& 'number' === typeof p.id
	&& 'string' === typeof p.name
	&& 'number' === typeof p.latitude
	&& 'number' === typeof p.longitude

const validAddress = (p) =>
	   p.type === 'address'
	&& 'string' === typeof p.name
	&& 'number' === typeof p.latitude
	&& 'number' === typeof p.longitude

const validLocation = so(function* (l) {return
	validStation(l) || validPoi(l) || validAddress(l)
})

const validLine = (l) =>
	   'string' === typeof l.name
	&& 'number' === typeof l.nr
	&& 'number' === typeof l.class
	&& 'number' === typeof l.productCode
	&& 'string' === typeof l.productName

const validStop = (s) =>
	   s.arrival instanceof Date
	&& s.departure instanceof Date
	&& validStation(s.station)

const isJungfernheide = (s) =>
	   s.type === 'station'
	&& s.id === 8011167
	&& s.name === 'Berlin Jungfernheide'
	&& s.latitude === 52.530273
	&& s.longitude === 13.299433

const isMünchenHbf = (s) =>
	   s.type === 'station'
	&& s.id === 8000261
	&& s.name === 'München Hbf'
	&& s.latitude === 48.140229
	&& s.longitude === 11.558339



// fixtures

const minute = 60 * 1000
const hour = 60 * minute
const when = new Date(+floor(new Date(), 'day') + 10 * hour)
const validWhen = isRoughlyEqual(10 * hour, +when)



test(function* () {
	// Berlin Jungfernheide to München Hbf
	const routes = yield hafas.routes(8011167, 8000261,
		{when, passedStations: true})
	ok(Array.isArray(routes))
	eql(routes.length, 3)
	for (let route of routes) {

		ok(validStation(route.from))
		ok(yield findStation(route.from))
		ok(validWhen(route.start))

		ok(validStation(route.to))
		ok(validStation(route.to))
		ok(validWhen(route.end))

		ok(Array.isArray(route.parts))
		ok(route.parts.length > 0)
		const part = route.parts[0]

		ok(validStation(part.from))
		ok(yield findStation(part.from))
		ok(validWhen(part.start))

		ok(validStation(part.to))
		ok(yield findStation(part.to))
		ok(validWhen(part.end))

		ok(validLine(part.product))

		ok(Array.isArray(part.passed))
		for (let stop of part.passed) ok(validStop(stop))
	}
})



test(function* () {
	// Berlin Jungfernheide to Torfstraße 17
	const routes = yield hafas.routes(8011167, {
		type: 'address', name: 'Torfstraße 17',
		latitude: 52.5416823, longitude: 13.3491223
	}, {when})

	ok(Array.isArray(routes))
	ok(routes.length >= 1)
	const route = routes[0]
	const part = route.parts[route.parts.length - 1]

	ok(validStation(part.from))
	ok(validWhen(part.start))

	ok(validAddress(part.to))
	eql(part.to.name, 'Torfstraße 17')
	ok(isRoughlyEqual(.0001, part.to.latitude, 52.5416823))
	ok(isRoughlyEqual(.0001, part.to.longitude, 13.3491223))
	ok(validWhen(part.end))
})



test(function* () {
	// Berlin Jungfernheide to ATZE Musiktheater
	const routes = yield hafas.routes(8011167, {
		type: 'poi', name: 'ATZE Musiktheater', id: 990363204,
		latitude: 52.543333, longitude: 13.351686
	}, {when})

	ok(Array.isArray(routes))
	ok(routes.length >= 1)
	const route = routes[0]
	const part = route.parts[route.parts.length - 1]

	ok(validStation(part.from))
	ok(validWhen(part.start))

	ok(validPoi(part.to))
	eql(part.to.name, 'ATZE Musiktheater')
	ok(isRoughlyEqual(.0001, part.to.latitude, 52.543333))
	ok(isRoughlyEqual(.0001, part.to.longitude, 13.351686))
	ok(validWhen(part.end))
})



test(function* () {
	// Berlin Jungfernheide
	const deps = yield hafas.departures(8011167, {duration: 5, when})

	ok(Array.isArray(deps))
	for (let dep of deps) {
		ok(validStation(dep.station))
		ok(yield findStation(dep.station))
		ok(validWhen(dep.when))
	}
})



test(function* () {
	// Berlin Jungfernheide
	const nearby = yield hafas.nearby(52.530273, 13.299433,
		{results: 2, distance: 400})

	ok(Array.isArray(nearby))
	eql(nearby.length, 2)

	ok(isJungfernheide(nearby[0]))
	ok(nearby[0].distance >= 0)
	ok(nearby[0].distance <= 100)
})



test(function* () {
	const locations = yield hafas.locations('Jungfernheide', {results: 10})

	ok(Array.isArray(locations))
	ok(locations.length > 0)
	ok(locations.length <= 10)

	ok(locations.every(validLocation))
	ok(locations.find(isJungfernheide))
})
