'use strict'

const createHafas = require('.')
// const createThrottledHafas = require('.')

const hafas = createHafas('db-hafas-example')
// const hafas = createThrottledHafas('db-hafas-example', 5, 100)

// Berlin Jungfernheide to München Hbf
hafas.journeys('8011167', '8000261', {results: 1})
// hafas.departures('8011167', {duration: 1})
// hafas.locations('Berlin Jungfernheide')
// hafas.locations('ATZE Musiktheater', {poi: true, addressses: false, fuzzy: false})
// hafas.station('8089083')
// hafas.nearby(52.4751309, 13.3656537, {results: 1})
// hafas.radar({
// 	north: 52.5522,
// 	west: 13.3489,
// 	south: 52.5405,
// 	east: 13.3705
// }, {results: 10})

// .then(([journey]) => {
// 	const leg = journey.legs[0]
// 	return hafas.journeyLeg(leg.id, leg.line.name, {polyline: true})
// })
.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
}, console.error)
