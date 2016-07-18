'use strict'

const _ = require('hafas-client/parse')
const modes = require('./modes')



const location = (l) => {
	const r = _.location(l)
	if (r.type === 'station' && r.products)
		r.products = modes.parseBitmask(r.products)
	return r
}



module.exports = {location}
