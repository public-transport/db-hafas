import createClient from 'hafas-client'
import withThrottling from 'hafas-client/throttle.js'
import dbProfile from 'hafas-client/p/db/index.js'

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

export {
	createThrottledClient,
}
