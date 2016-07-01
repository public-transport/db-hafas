'use strict'

const filter = require('hafas-client/stringify').locationFilter
const request = require('./request')
const parse = require('./parse')



const defaults = {
	  fuzzy:     true // find only exact matches?
	, results:   10 // how many search results?
	, stations:  true
	, addresses: true
	, poi:       true // points of interest
}



const locations = (query, opt) => {
	if ('string' !== typeof query) throw new Error('query must be a string.')
	opt = Object.assign({}, defaults, opt || {})
	const type = filter(opt.stations, opt.addresses, opt.poi)

	return request({
		  cfg: {polyEnc: 'GPA'}
		, meth: 'LocMatch'
		, req: {input: {
			  loc: {type, name: opt.fuzzy ? query + '?' : query}
			, maxLoc: opt.results
			, field: 'S' // todo: what is this?
		}}
	})
	.then((d) => {
		if (!d.match || !Array.isArray(d.match.locL)) return []
		return d.match.locL.map(parse.location)
	}, (err) => err)
}

module.exports = locations
