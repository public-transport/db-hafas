'use strict'

const createClient = require('hafas-client')
const withRetrying = require('hafas-client/retry')
const dbProfile = require('hafas-client/p/db')

const createRetryingClient = (userAgent, opt = {}) => {
	const {retryOpts} = {retryOpts: {}, ...opt}

	const retryingProfile = withRetrying(dbProfile, retryOpts)
	return createClient(retryingProfile, userAgent, opt)
}

module.exports = createRetryingClient
