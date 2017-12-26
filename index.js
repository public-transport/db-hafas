'use strict'

const createClient = require('hafas-client')
const dbProfile = require('hafas-client/p/db')

const client = createClient(dbProfile)

module.exports = client
