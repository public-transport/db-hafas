'use strict'

const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

const defaults = {
	profile: dbProfile,
}

const createHafas = (userAgent, opt = {}) => {
	const {
		profile,
	} = {...defaults, ...opt}

	return createClient(profile, userAgent, opt)
}

createHafas.defaults = defaults
module.exports = createHafas
