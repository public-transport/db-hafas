'use strict'

const stringify = require('hafas-client/stringify')
const modes = require('./modes')



const date = (when) => stringify.date('Europe/Berlin', when)
const time = (when) => stringify.time('Europe/Berlin', when)



const products = (data) =>
	({type: 'PROD', mode: 'INC', value: modes.stringifyBitmask(data) + ''})



module.exports = {date, time, products}
