# db-hafas

**A client for the German Railways (DB).** It acts as a consistent and straightforward interface on top of a verbose API.

This project is basically a thin wrapper around [`hafas-client`](https://github.com/derhuerst/hafas-client/tree/any-endpoint#hafas-client). [Its docs](https://github.com/derhuerst/hafas-client/tree/any-endpoint/docs) document the API in general.

[![npm version](https://img.shields.io/npm/v/db-hafas.svg)](https://www.npmjs.com/package/db-hafas)
[![dependency status](https://img.shields.io/david/derhuerst/db-hafas.svg)](https://david-dm.org/derhuerst/db-hafas)
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

As an example, we will search for a route from *Berlin Jungfernheide* to *München Hbf*. To get the station ids, use [`locations(query, [opt])`](https://github.com/derhuerst/hafas-client/blob/any-endpoint/docs/locations.md).

```javascript
client.journeys('8011167', '8000261')
.then((journeys) => console.log(journeys[0]))
.catch(console.error)
```

The output will be in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format):

```javascript
[ {
	legs: [ {
		id: '1|98397|0|81|26122017',
		origin: {
			type: 'station',
			id: '8011167',
			name: 'Berlin Jungfernheide',
			location: {
				type: 'location',
				latitude: 52.530408,
				longitude: 13.299424
			},
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
		departure: '2017-12-26T05:57:00.000+01:00', // ISO 8601 string
		departurePlatform: '3',
		delay: 0, // in seconds
		destination: {
			type: 'station',
			id: '8098160',
			name: 'Berlin Hbf (tief)',
			location: {
				type: 'location',
				latitude: 52.52585,
				longitude: 13.368883
			},
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
		arrival: '2017-12-26T06:01:00.000+01:00', // ISO 8601 string
		arrivalPlatform: '4',
		line: {
			type: 'line',
			id: '56552',
			name: 'RE 56552',
			public: true,
			mode: 'train',
			product: 'regional',
			class: 8,
			productCode: 3
		},
		direction: 'Ludwigsfelde'
	}, {
		id: '1|72980|0|81|26122017',
		origin: {
			type: 'station',
			id: '8098160',
			name: 'Berlin Hbf (tief)',
			location: {
				type: 'location',
				latitude: 52.52585,
				longitude: 13.368883
			},
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
		departure: '2017-12-26T06:30:00.000+01:00', // ISO 8601 string
		departurePlatform: '1',
		destination: {
			type: 'station',
			id: '8000261',
			name: 'München Hbf',
			location: {
				type: 'location',
				latitude: 48.140364,
				longitude: 11.558735
			},
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
		arrival: '2017-12-26T11:02:00.000+01:00', // ISO 8601 string
		arrivalPlatform: '22',
		line: {
			type: 'line',
			id: '1505',
			name: 'ICE 1505',
			public: true,
			mode: 'train',
			product: 'nationalExp',
			class: 1,
			productCode: 0
		},
		direction: 'München Hbf'
	} ],
	// taken from the first leg
	origin: {
		type: 'station',
		id: '8011167',
		name: 'Berlin Jungfernheide',
		location: {
			type: 'location',
			latitude: 52.530408,
			longitude: 13.299424
		},
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
	departure: '2017-12-26T05:57:00.000+01:00', // ISO 8601 string
	// taken from the last part
	destination: {
		type: 'station',
		id: '8000261',
		name: 'München Hbf',
		location: {
			type: 'location',
			latitude: 48.140364,
			longitude: 11.558735
		},
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
	arrival: '2017-12-26T11:02:00.000+01:00', // ISO 8601 string
	price: {
		amount: 150, hint: null
	}
} ]
```


## Similar Projects

- [Fahrplan.js](https://github.com/pbock/fahrplan) – "A JavaScript client for Deutsche Bahn's timetable API"
- [db-stations](https://github.com/derhuerst/db-stations) – An offline list of all DB stations.
- [vbb-stations](https://github.com/derhuerst/vbb-stations) – A client for the Berlin & Brandenburg public transport service (VBB).


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-hafas/issues).
