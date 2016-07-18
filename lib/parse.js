'use strict'

const _ = require('hafas-client/parse')
const modes = require('./modes')



const location = (l) => {
	const r = _.location(l)
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
