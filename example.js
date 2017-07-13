'use strict'

const hafas = require('.')


// Berlin Jungfernheide to München Hbf
hafas.journeys('8011167', '8000261', {results: 1})
// hafas.departures('8011167', {duration: 1})
// hafas.locations('Berlin Jungfernheide')
// hafas.locations('ATZE Musiktheater', {poi: true, addressses: false, fuzzy: false})
// hafas.nearby(52.4751309, 13.3656537, {results: 1})
.then((data) => {
	console.log(require('util').inspect(data, {depth: null}))
}, console.error)
