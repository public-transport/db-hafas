# db-hafas

**A client for the German Railway (DB).** It acts as a consistent and straightforward promise-based interface on top of the verbose [HAFAS](http://hacon.de/hafas) mobile API.

[![npm version](https://img.shields.io/npm/v/db-hafas.svg)](https://www.npmjs.com/package/db-hafas)
[![build status](https://img.shields.io/travis/derhuerst/db-hafas.svg)](https://travis-ci.org/derhuerst/db-hafas)
[![dependency status](https://img.shields.io/david/derhuerst/db-hafas.svg)](https://david-dm.org/derhuerst/db-hafas)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/db-hafas.svg)](https://david-dm.org/derhuerst/db-hafas#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/db-hafas.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install db-hafas
```


## Getting Started

```javascript
const hafas = require('db-hafas')
```

- [`routes(from, to, [opt])`](docs/routes.md) to get routes between locations
- [`departures(station, [opt])`](docs/departures.md) to query the next departures at a station
- [`nearby(latitude, longitude, [opt])`](docs/nearby.md) to show stations & POIs around
- [`locations(query, [opt])`](docs/locations.md) to find stations, POIs and addresses

As an example, we will search for a route from *Berlin Jungfernheide* to *München Hbf*. To get the station ids, use [`locations(query, [opt])`](docs/locations.md).

```javascript
client.routes(8011167, 8000261)
.then((routes) => console.log(routes[0]))
```

The output will have the following structure:

```javascript
{
	// taken from first part
	start: 2016-07-31T10:00:00.000Z, // Date object
	from: {
		type: 'station',
		id: 8089100,
		name: 'Berlin Jungfernheide (S)',
		latitude: 52.530372,
		longitude: 13.299442,
		products: {
			nationalExp: false,
			national: false,
			regionalExp: false,
			regional: true,
			suburban: true,
			bus: false,
			ferry: false,
			subway: false,
			tram: false,
			taxi: false
		}
	},

	// taken from last part
	end: 2016-07-31T16:41:00.000Z, // Date object
	to: {
		type: 'station',
		id: 8000261,
		name: 'München Hbf',
		latitude: 48.140229,
		longitude: 11.558339,
		products: /* … */
	},

	parts: [
		{
			start: 2016-07-31T10:00:00.000Z, // Date object
			from: {
				type: 'station',
				id: 8089100,
				name: 'Berlin Jungfernheide (S)',
				latitude: 52.530372,
				longitude: 13.299442,
				products: /* … */
			},
			end: 2016-07-31T10:20:00.000Z, // Date object
			to: {
				type: 'station',
				id: 8089073,
				name: 'Berlin Südkreuz (S)',
				latitude: 52.476131,
				longitude: 13.365144,
				products: /* … */
			},
			direction: 'Ringbahn <-',
			product: {
				name: 'S 42',
				nr: 42,
				class: 16,
				productCode: 4,
				productName: 's'
			}
		}, {
			start: 2016-07-31T10:20:00.000Z, // Date object
			from: {
				type: 'station',
				id: 8089073,
				name: 'Berlin Südkreuz (S)',
				latitude: 52.476131,
				longitude: 13.365144,
				products: /* … */
			},
			end: 2016-07-31T10:27:00.000Z, // Date object
			to: {
				type: 'station',
				id: 8011113,
				name: 'Berlin Südkreuz',
				latitude: 52.475043,
				longitude: 13.365315,
				products: /* … */
			},
			type: 'walking'
		}, {
			start: 2016-07-31T10:34:00.000Z, // Date object
			from: {
				type: 'station',
				id: 8011113,
				name: 'Berlin Südkreuz',
				latitude: 52.475043,
				longitude: 13.365315,
				products: /* … */
			},
			end: 2016-07-31T16:41:00.000Z, // Date object
			to: {
				type: 'station',
				id: 8000261,
				name: 'München Hbf',
				latitude: 48.140229,
				longitude: 11.558339,
				products: /* … */
			},
			direction: 'Innsbruck Hbf',
			product: {
				name: 'ICE 1209',
				nr: 1209,
				class: 1,
				productCode: 0,
				productName: 'ICE'
			}
		}
	]
}
```


## Similar Projects

- [Fahrplan.js](https://github.com/pbock/fahrplan) – "A JavaScript client for Deutsche Bahn's timetable API"
- [db-stations](https://github.com/derhuerst/db-stations) – An offline list of all DB stations.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-hafas/issues).
