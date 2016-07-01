'use strict'

const crypto = require('crypto')
const parse = require('hafas-client/parse')
const hafas = require('hafas-client')

const endpoint = 'https://reiseauskunft.bahn.de/bin/mgate.exe'
const client = {id: 'DB', v: '16040000', type: 'IPH', name: 'DB Navigator'}
const ext = 'DB.R15.12.a'
const version = '1.15'
const auth = {type: 'AID', aid: 'n91dB8Z77MLdoR0K'}
const onBody = (body) => Object.assign(body, {client, ext, ver: version, auth})

// credits to @pajowu
// see https://github.com/pajowu/db-python/blob/015f28369f6aa9345cb51c1c9ce5c6cd225c80aa/bahn.py#L133-L140
const salt = 'bdI8UVj40K5fvxwf'
const onReq = (req) => {
	if (!req.query) req.query = {}
	const hash = crypto.createHash('md5')
	hash.update(req.body + salt)
	req.query.checksum = hash.digest('hex')
	return req
}

const request = hafas({endpoint, onBody, onReq})
module.exports = request
