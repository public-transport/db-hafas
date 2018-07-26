'use strict'

const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

const createHafas = (userAgent) => createClient(dbProfile, userAgent)

module.exports = createHafas
