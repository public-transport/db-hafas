import createClient from 'hafas-client'
import dbProfile from 'hafas-client/p/db/index.js'

const defaults = {
	profile: dbProfile,
}

const createDbHafas = (userAgent, opt = {}) => {
	const {
		profile,
	} = {...defaults, ...opt}

	return createClient(profile, userAgent, opt)
}

export {
	defaults,
	createDbHafas,
}
