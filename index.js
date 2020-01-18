'use strict'

const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

const createHafas = (userAgent, opt = {}) => {
	return createClient(dbProfile, userAgent, opt)
}

module.exports = createHafas
