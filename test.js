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
