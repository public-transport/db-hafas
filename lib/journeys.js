'use strict'

const stringify = require('hafas-client/stringify')
const _stringify = require('./stringify')
const {loyaltyCards} = _stringify
const request = require('./request')
const parse = require('./parse')



const defaults = {
	via:            null, // let journeys pass this station
	passedStations: false, // return stations on the way?
	transfers:      5, // maximum of 5 transfers
	transferTime:   0, // minimum time for a single transfer in minutes
	accessibility:  'none', // 'none', 'partial' or 'complete'
	bike:           false, // only bike-friendly journeys
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
	},
	loyaltyCard:     {type: loyaltyCards.NONE}
}

const isNumber = /^\d{7,}$/

const location = (l) => {
	if ('string' === typeof l) {
		if (!isNumber.test(l)) throw new Error('station must be an IBNR.')
		return stringify.station(l)
	}
	else if ('object' === typeof l) {
		if (l.type === 'station') {
			if (!isNumber.test(l.id)) throw new Error('station id must be an IBNR.')
			return stringify.station(l.id)
		} else if (l.type === 'poi') {
			return stringify.poi(l.latitude, l.longitude, l.id, l.name)
		} else if (l.type === 'address') {
			return stringify.address(l.latitude, l.longitude, l.name)
		} else throw new Error('invalid location.')
	}
	else throw new Error('valid station, address or poi required.')
}



const journeys = (from, to, opt = {}) => {
	from = location(from)
	to = location(to)

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
			, getPasslist: opt.passedStations
			, maxChg: opt.transfers
			, minChgTime: opt.transferTime
			, depLocL: [from]
			, viaLocL: opt.via ? [opt.via] : null
			, arrLocL: [to]
			, jnyFltrL: [filters]

			// todo
			, trfReq: {
				jnyCl: 2,
				tvlrProf: [{
					type: 'E',
					redtnCard: _stringify.loyaltyCard(opt.loyaltyCard)
				}],
				cType: 'PK'
			}
			, getPT: true, outFrwd: true
			, getTariff: false // todo
			, getIV: false // walk & bike as alternatives?
			, getPolyline: false // shape for displaying on a map?
		}
	})
	// todo: planning period d.fpB, d.fpE
	.then((d) => {
		if (!Array.isArray(d.outConL)) return []
		return d.outConL.map(parse.journey('Europe/Berlin', d.locations, d.lines, d.remarks))
	})
}

module.exports = Object.assign(journeys, loyaltyCards)
