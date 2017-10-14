'use strict'

const stringify = require('hafas-client/stringify')
const modes = require('./modes')



const date = (when) => stringify.date('Europe/Berlin', when)
const time = (when) => stringify.time('Europe/Berlin', when)



const products = (data) =>
	({type: 'PROD', mode: 'INC', value: modes.stringifyBitmask(data) + ''})



const loyaltyCards = {
	NONE: Symbol('no loyaly card'),
	BAHNCARD: Symbol('Bahncard'),
	VORTEILSCARD: Symbol('VorteilsCard'),
	HALBTAXABO: Symbol('HalbtaxAbo'),
	VOORDEELURENABO: Symbol('Voordeelurenabo'),
	SHCARD: Symbol('SH-Card'),
	GENERALABONNEMENT: Symbol('General-Abonnement')
}

// see https://gist.github.com/juliuste/202bb04f450a79f8fa12a2ec3abcd72d
const loyaltyCard = (data) => {
	let id = 0
	if (data.type === loyaltyCards.BAHNCARD) {
		if (data.discount === 25) {
			id = loyaltyCards.class === 1 ? 1 : 2
		} else if (data.discount === 50) {
			id = loyaltyCards.class === 1 ? 3 : 4
		}
	} else if (data.type === loyaltyCards.VORTEILSCARD) {
		id = 9
	} else if (data.type === loyaltyCards.HALBTAXABO) {
		id = data.railplus ? 10 : 11
	} else if (data.type === loyaltyCards.VOORDEELURENABO) {
		id = data.railplus ? 12 : 13
	} else if (data.type === loyaltyCards.SHCARD) {
		id = 14
	} else if (data.type === loyaltyCards.GENERALABONNEMENT) {
		id = 15
	}
	return id
}



module.exports = {date, time, products, loyaltyCards, loyaltyCard}
