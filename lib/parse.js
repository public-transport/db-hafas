'use strict'

const _ = require('hafas-client/parse')
const modes = require('./modes')



const leadingZeros = /^0+/

const valueFromLID = (lid, key) => lid.split('@')
	.map((part) => part.split('='))
	.find(([k, v]) => k === key)
	[1]

const location = (l) => {
	const r = _.location(l)

	if (r.id) r.id = r.id.replace(leadingZeros, '')
	if (r.coordinates) {
		if (!r.coordinates.latitude) {
			r.coordinates.latitude = valueFromLID(l.lid, 'Y') / 1000000
		}
		if (!r.coordinates.longitude) {
			r.coordinates.longitude = valueFromLID(l.lid, 'X') / 1000000
		}
	}
	if (r.type === 'station' && r.products) {
		r.products = modes.parseBitmask(r.products)
	}
	return r
}



const line = (p) => {
	const r = _.line(p)
	if (!r) return null

	if ('productCode' in r) {
		r.productCode = parseInt(r.productCode)
	}
	if ('class' in r) {
		r.class = parseInt(r.class)
		const data = modes.bitmasks[r.class] || {}
		r.mode = data.mode || null
		r.product = data.product || null
	}

	return r
}



const nearby = (l) => {
	const r = location(l)
	r.distance = l.dist
	return r
}



const journey = (timezone, locations, lines, remarks) => {
	const parse = _.journey(timezone, locations, lines, remarks)
	return (r) => {
		const parsed = parse(r)
		parsed.price = {amount: null, hint: 'No pricing information available.'}

		// todo: find cheapest, find discounts
		if (r.trfRes && r.trfRes.fareSetL && r.trfRes.fareSetL[0]
		&& r.trfRes.fareSetL[0].fareL && r.trfRes.fareSetL[0].fareL[0]) {
			const tariff = r.trfRes.fareSetL[0].fareL[0]
			if (tariff.prc >= 0) parsed.price = {amount: tariff.prc / 100}
		}

		return parsed
	}
}



module.exports = {location, line, nearby, journey}
