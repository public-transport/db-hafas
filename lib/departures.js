'use strict'

const stringify = require('./stringify')
const request = require('./request')
const parse = require('hafas-client/parse')



const defaults = {
	direction: null, // only show departures heading to this station
	// todo: find option for absolute number of results
	duration:  10, // show departures for the next n minutes
	products: {
		suburban:    true,
		subway:      true,
		tram:        true,
		bus:         true,
		ferry:       true,
		national:    true,
		nationalExp: true,
		regional:    true,
		regionalExp: true
	}
}



const departures = (station, opt = {}) => {
	if ('number' !== typeof station) throw new Error('station must be a number.')
	opt.products = Object.assign({}, defaults.products, opt.products)
	opt = Object.assign({}, defaults, opt)
	opt.when = opt.when || new Date()

	return request({
		  meth: 'StationBoard'
		, req: {
        	  type: 'DEP'
			, date: stringify.date(opt.when)
			, time: stringify.time(opt.when)
			, stbLoc: {type: 'S', lid: 'L=' + station}
			, dirLoc: opt.direction
				? {type: 'S', lid: 'L=' + opt.direction} : null
			, jnyFltrL: [stringify.products(opt.products)]
			, dur: opt.duration
	        , getPasslist: false
		}
	})
	// todo: planning period d.fpB, d.fpE
	.then((d) => {
		return Array.isArray(d.jnyL)
			? d.jnyL.map(parse.departure('Europe/Berlin', d.locations, d.products, d.remarks))
			: []
	})
}

module.exports = departures
