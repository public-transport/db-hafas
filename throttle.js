'use strict'

const createClient = require('hafas-client')
const withThrottling = require('hafas-client/throttle')
const dbProfile = require('hafas-client/p/db')

const createThrottledClient = (userAgent, limit = 5, interval = 1000) => {
	return withThrottling(createClient, limit, interval)(dbProfile, userAgent)
}

module.exports = createThrottledClient
