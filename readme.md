# db-hafas

[![Greenkeeper badge](https://badges.greenkeeper.io/derhuerst/db-hafas.svg)](https://greenkeeper.io/)

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
client.journeys('8011167', '8000261')
.then((journeys) => console.log(journeys[0]))
.catch(console.error)
```

The output will be in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format):

```javascript
{
	parts: [ {
		id: '1|202507|0|80|13072017',
		origin: {
			type: 'station',
			id: '8011167',
			name: 'Berlin Jungfernheide',
			coordinates: {latitude: 52.530408, longitude: 13.299424},
			products: {
				nationalExp: false,
				national: false,
				regionalExp: false,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: true,
				tram: false,
				taxi: false
			}
		},
		destination: {
			type: 'station',
			id: '8010404',
			name: 'Berlin-Spandau',
			coordinates: {latitude: 52.533787, longitude: 13.200965},
			products: {
				nationalExp: true,
				national: true,
				regionalExp: true,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: true,
				tram: false,
				taxi: false
			}
		},
		departure: '2017-07-13T17:21:00+02:00', // ISO 8601 string
		departurePlatform: '4',
		arrival: '2017-07-13T17:25:00+02:00', // ISO 8601 string
		arrivalPlatform: '3',
		delay: 0, // in seconds
		line: {
			type: 'line',
			name: 'RB 18524',
			class: 8,
			productCode: 3,
			productName: 'RB',
			mode: 'train',
			product: 'regional'
		},
		direction: 'Nauen'
	}, {
		id: '1|187152|0|80|13072017',
		origin: {
			type: 'station',
			id: '8010404',
			name: 'Berlin-Spandau',
			coordinates: {latitude: 52.533787, longitude: 13.200965},
			products: {
				nationalExp: true,
				national: true,
				regionalExp: true,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: true,
				tram: false,
				taxi: false
			}
		},
		destination: {
			type: 'station',
			id: '8003200',
			name: 'Kassel-Wilhelmshöhe',
			coordinates: {latitude: 51.312998, longitude: 9.446845},
			products: {
				nationalExp: true,
				national: true,
				regionalExp: true,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: false,
				tram: true,
				taxi: true
			}
		},
		departure: '2017-07-13T17:45:00+02:00', // ISO 8601 string
		departurePlatform: '4',
		arrival: '2017-07-13T20:03:00+02:00', // ISO 8601 string
		arrivalPlatform: '2',
		delay: 0, // in seconds
		line: {
			type: 'line',
			name: 'ICE 1093',
			class: 1,
			productCode: 0,
			productName: 'ICE',
			mode: 'train',
			product: 'nationalExp'
		},
		direction: 'Stuttgart Hbf'
	}, {
		id: '1|199821|0|80|13072017',
		origin: {
			type: 'station',
			id: '8003200',
			name: 'Kassel-Wilhelmshöhe',
			coordinates: {latitude: 51.312998, longitude: 9.446845},
			products: {
				nationalExp: true,
				national: true,
				regionalExp: true,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: false,
				tram: true,
				taxi: true
			}
		},
		destination: {
			type: 'station',
			id: '8000261',
			name: 'München Hbf',
			coordinates: {latitude: 48.140364, longitude: 11.558735},
			products: {
				nationalExp: true,
				national: true,
				regionalExp: true,
				regional: true,
				suburban: true,
				bus: true,
				ferry: false,
				subway: true,
				tram: true,
				taxi: false
			}
		},
		departure: '2017-07-13T20:27:00+02:00', // ISO 8601 string
		departurePlatform: '1',
		arrival: '2017-07-13T23:46:00+02:00', // ISO 8601 string
		arrivalPlatform: '19',
		delay: 0, // in seconds
		line: {
			type: 'line',
			name: 'ICE 885',
			class: 1,
			productCode: 0,
			productName: 'ICE',
			mode: 'train',
			product: 'nationalExp'
		},
		direction: 'München Hbf'
	} ],
	// taken from first part
	origin: {
		type: 'station',
		id: '8011167',
		name: 'Berlin Jungfernheide',
		coordinates: {latitude: 52.530408, longitude: 13.299424},
		products: {
			nationalExp: false,
			national: false,
			regionalExp: false,
			regional: true,
			suburban: true,
			bus: true,
			ferry: false,
			subway: true,
			tram: false,
			taxi: false
		}
	},
	// taken from last part
	destination: {
		type: 'station',
		id: '8000261',
		name: 'München Hbf',
		coordinates: {latitude: 48.140364, longitude: 11.558735},
		products: {
			nationalExp: true,
			national: true,
			regionalExp: true,
			regional: true,
			suburban: true,
			bus: true,
			ferry: false,
			subway: true,
			tram: true,
			taxi: false
		}
	},
	// taken from first part
	departure: '2017-07-13T17:21:00+02:00', // ISO 8601 string
	// taken from last part
	arrival: '2017-07-13T23:46:00+02:00', // ISO 8601 string
	price: {amount: 145}
}
```


## Similar Projects

- [Fahrplan.js](https://github.com/pbock/fahrplan) – "A JavaScript client for Deutsche Bahn's timetable API"
- [db-stations](https://github.com/derhuerst/db-stations) – An offline list of all DB stations.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-hafas/issues).
