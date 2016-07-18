'use strict'

const stringify = require('hafas-client/stringify')
const _stringify = require('./stringify')
const request = require('./request')
const parse = require('hafas-client/parse')



const defaults = {
	results:        5, // how many routes?
	via:            null, // let routes pass this station
	passedStations: false, // return stations on the way?
	transfers:      5, // maximum of 5 transfers
	transferTime:   0, // minimum time for a single transfer in minutes
	accessibility:  'none', // 'none', 'partial' or 'complete'
	bike:           false, // only bike-friendly routes
	products: {
		suburban:    true,
		subway:      true,
		tram:        true,
		bus:         true,
		ferry:       true,
		nationalExp: true,
		national:    true,
		regionalExp: true,
		regional:    true
	}
}

const location = (l) => {
	if ('number' === typeof l) return stringify.station(l)
	else if ('object' === typeof l) {
		if (l.type === 'poi')
			return stringify.poi(l.latitude, l.longitude, l.id, l.name)
		else if (l.type === 'address')
			return stringify.address(l.latitude, l.longitude, l.name)
		else throw new Error('invalid location.')
	}
	else throw new Error('valid station, address or poi required.')
}



const routes = (from, to, opt) => {
	from = location(from)
	to = location(to)

	opt = opt || {}
	opt.products = Object.assign({}, defaults.products, opt.products)
	opt = Object.assign({}, defaults, opt)
	opt.when = opt.when || new Date()
	if (opt.via) opt.via = location(opt.via)

	const filters = [
		  _stringify.products(opt.products)
		, stringify.accessibility[opt.accessibility]
	]
	if (opt.bike) filters.push(stringify.bike)
	// todo: add req.gisFltrL

	return request({
		  cfg: {polyEnc: 'GPA'}
		, meth: 'TripSearch'
		, req: {
			  outDate: _stringify.date(opt.when)
			, outTime: _stringify.time(opt.when)
			, numF: opt.results
			, getPasslist: opt.passedStations
			, maxChg: opt.transfers
			, minChgTime: opt.transferTime
			, depLocL: [from]
			, viaLocL: opt.via ? [opt.via] : null
			, arrLocL: [to]
			, jnyFltrL: [filters]

			// todo
			, trfReq: {jnyCl: 2, tvlrProf: [{type: 'E'}], cType: 'PK'}
			, getPT: true, outFrwd: true
			, getTariff: false // todo
			, getIV: false // walk & bike as alternatives?
			, getPolyline: false // shape for displaying on a map?
		}
	})
	// todo: planning period d.fpB, d.fpE
	.then((d) => {
		if (Array.isArray(d.outConL)) console.log('results', d.outConL.length)
		if (!Array.isArray(d.outConL)) return []
		return d.outConL.map(parse.route('Europe/Berlin', d.locations, d.products, d.remarks))
	}, (err) => err)
}

module.exports = routes
