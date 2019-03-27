'use strict'

const createClient = require('hafas-client')
const withRetrying = require('hafas-client/retry')
const dbProfile = require('hafas-client/p/db')

const createRetryingClient = (userAgent, retryOpts = {}) => {
	return withRetrying(createClient, retryOpts)(dbProfile, userAgent)
}

module.exports = createRetryingClient
