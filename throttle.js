'use strict'

const createClient = require('hafas-client')
const withThrottling = require('hafas-client/throttle')
const dbProfile = require('hafas-client/p/db')

const createThrottledClient = (userAgent, opt = {}) => {
	const {
		throttlingLimit: limit,
		throttlingInterval: interval
	} = {
		throttlingLimit: 5,
		throttlingInterval: 1000, // 1s
		...opt
	}

	const throttledProfile = withThrottling(dbProfile, limit, interval)
	return createClient(throttledProfile, userAgent, opt)
}

module.exports = createThrottledClient
