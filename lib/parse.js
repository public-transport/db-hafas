'use strict'

const _ = require('hafas-client/parse')
const modes = require('./modes')



const location = (l) => {
	const r = parse.location(l)
	r.products = modes.parseBitmask(r.products)
	return r
}



module.exports = {location}
