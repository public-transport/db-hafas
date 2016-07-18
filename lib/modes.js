'use strict'

const m = {
	  nationalExp: {
		  bitmask:	1
		, name:		'InterCityExpress'
		, short:	'ICE'
		, type:		'nationalExp'
	}
	, national: {
		  bitmask:	2
		, name:		'InterCity & EuroCity'
		, short:	'IC/EC'
		, type:		'national'
	}
	, regionalExp: {
		  bitmask:	4
		, name:		'InterRegio'
		, short:	'IR'
		, type:		'regionalExp'
	}
	, regional: {
		  bitmask:	8
		, name:		'RegionalExpress & Regio'
		, short:	'RE/RB'
		, type:		'regional'
	}
	, sbahn: {
		  bitmask:	16
		, name:		'S-Bahn'
		, short:	'S'
		, type:		'sbahn'
	}
	, bus: {
		  bitmask:	32
		, name:		'Bus'
		, short:	'B'
		, type:		'bus'
	}
	, ferry: {
		  bitmask:	64
		, name:		'Ferry'
		, short:	'F'
		, type:		'ferry'
	}
	, ubahn: {
		  bitmask:	128
		, name:		'U-Bahn'
		, short:	'U'
		, type:		'ubahn'
	}
	, tram: {
		  bitmask:	256
		, name:		'Tram'
		, short:	'T'
		, type:		'tram'
	}
	, taxi: {
		  bitmask:	512
		, name:		'Group Taxi'
		, short:	'Taxi'
		, type:		'taxi'
	}
	, unknown: {
		  bitmask:	0
		, name:		'unknown'
		, short:	'?'
		, type:		'unknown'
	}
}



m.bitmasks = []
m.bitmasks[1] = m.nationalExp
m.bitmasks[2] = m.national
m.bitmasks[4] = m.regionalExp
m.bitmasks[8] = m.regional
m.bitmasks[16] = m.sbahn
m.bitmasks[32] = m.bus
m.bitmasks[64] = m.ferry
m.bitmasks[128] = m.ubahn
m.bitmasks[256] = m.tram
m.bitmasks[512] = m.taxi



m.stringifyBitmask = (types) => {
	let bitmask = 0
	for (let type in types) {
		if (types[type] === true) bitmask += p[type].bitmask
	}
	return bitmask
}

m.parseBitmask = (bitmask) => {
	let types = {}, i = 1
	do {
		types[m.bitmasks[i].type] = !!(bitmask & i)
		i *= 2
	} while (m.bitmasks[i] && m.bitmasks[i].type)
	return types
}



module.exports = m
