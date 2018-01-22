'use strict'

const createThrottledClient = require('hafas-client/throttle')
const dbProfile = require('hafas-client/p/db')

const throttle = (limit = 5, interval = 1000) => {
	return createThrottledClient(dbProfile, limit, interval)
}

module.exports = throttle
