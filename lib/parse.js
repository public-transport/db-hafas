'use strict'

const _ = require('hafas-client/parse')
const modes = require('./modes')



const valueFromLID = (lid, key) => lid.split('@')
	.map((part) => part.split('='))
	.find(([k, v]) => k === key)
	[1]

const location = (l) => {
	const r = _.location(l)
	if (!r.latitude) r.latitude = valueFromLID(l.lid, 'Y') / 1000000
	if (!r.longitude) r.longitude = valueFromLID(l.lid, 'X') / 1000000
	if (r.type === 'station' && r.products)
		r.products = modes.parseBitmask(r.products)
	return r
}



const nearby = (l) => {
	const r = location(l)
	r.distance = l.dist
	return r
}



module.exports = {location, nearby}
