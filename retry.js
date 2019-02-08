'use strict'

const createClientWithRetry = require('hafas-client/retry')
const dbProfile = require('hafas-client/p/db')

const withRetry = (userAgent, retryOpts = {}) => {
	return createClientWithRetry(dbProfile, userAgent, retryOpts)
}

module.exports = withRetry
