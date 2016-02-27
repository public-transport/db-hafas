'use strict'

const url =     require('url');
const extend =  require('extend');
const path =    require('path');
const request = require('request-promise');





const endpoint = {
	protocol: 'http:',
	slashes:  true,
	hostname: 'open-api.bahn.de',
	pathname: '/bin/rest.exe/',
	query:    {format: 'json'}
}

const client = function (apiKey) {
	if ('string' !== typeof apiKey) throw new Error('Invalid api key.')
	let target = extend(true, {}, endpoint, {query: {authKey: apiKey}})

	return {

		locations: (query) =>
			request(url.format(extend(true, {}, target, {
				pathname: path.join(target.pathname, 'location.name'),
				query:    {input: query}
			})))
			.then(function (response) {
				// todo: work around this nasty "200 OK" for an invalid api key, see #1
				if (response.toLowerCase().substring(0, 15) === 'invalid authkey')
					throw new Error(response)
				try { return JSON.parse(response) }
				catch (e) { return {} }
			})
			.then(function (res) {
				res = res.LocationList
				if (res.errorCode)
					throw Object.assign(new Error(res.errorText), {code: res.errorCode})
				if ('StopLocation' in res) return Array.isArray(res.StopLocation)
					? res.StopLocation : [res.StopLocation]
				else return []
			})
			.then((stations) => stations.map((station) => ({
				id:        station.id,
				name:      station.name,
				position:  [parseFloat(station.lat), parseFloat(station.lon)]
			})))

	}
}

module.exports = client
