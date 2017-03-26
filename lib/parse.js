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



const route = (timezone, locations, products, remarks) => {
	const parse = _.route(timezone, locations, products, remarks)
	return (r) => {
		const parsed = parse(r)
		parsed.price = {amount: null, hint: 'No pricing information available.'}
		parsed.arrivalPlatform = r.arr.aPlatfS
		parsed.departurePlatform = r.dep.dPlatfS
		if (r.trfRes && r.trfRes.fareSetL && r.trfRes.fareSetL[0]
		&& r.trfRes.fareSetL[0].fareL && r.trfRes.fareSetL[0].fareL[0]) {
			const tariff = r.trfRes.fareSetL[0].fareL[0]
			if (tariff.prc >= 0) parsed.price = {amount: tariff.prc / 100}
		}
		return parsed
	}
}



module.exports = {location, nearby, route}
