import {createClient} from 'hafas-client'
import {withRetrying} from 'hafas-client/retry.js'
import {profile as dbProfile} from 'hafas-client/p/db/index.js'

const createRetryingClient = (userAgent, opt = {}) => {
	const {retryOpts} = {retryOpts: {}, ...opt}

	const retryingProfile = withRetrying(dbProfile, retryOpts)
	return createClient(retryingProfile, userAgent, opt)
}

export {
	createRetryingClient,
}
