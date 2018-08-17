'use strict'

const createThrottledClient = require('hafas-client/throttle')
const dbProfile = require('hafas-client/p/db')

const throttle = (userAgent, limit = 5, interval = 1000) => {
	return createThrottledClient(dbProfile, userAgent, limit, interval)
}

module.exports = throttle
