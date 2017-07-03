# `departures(station, [opt])`

`station` must be a station id like `8011167`.

With `opt`, you can override the default options, which look like this:

```js
{
	when:      new Date(),
	direction: null, // only show departures heading to this station
	duration:  10 // show departures for the next n minutes
}
```

## Response

With `station = 8011167` and `duration: 1`, the response may look like this:

```js
[ {
	station: {
		type: 'station',
		id: '730988',
		name: 'Tegeler Weg/Jungfernheide (S), Berlin',
		coordinates: {latitude: 52.52932, longitude: 13.296394},
		products: {
			nationalExp: false,
			national: false,
			regionalExp: false,
			regional: false,
			suburban: false,
			bus: true,
			ferry: false,
			subway: false,
			tram: false,
			taxi: false
		}
	},
	when: '2017-07-03T17:59:00+02:00',
	direction: 'S+U Zoologischer Garten',
	line: {
		type: 'line',
		name: 'Bus 109',
		class: 32,
		productCode: 5,
		productName: 'Bus',
		mode: 'bus',
		product: 'bus'
	},
	remarks: null,
	trip: 953397,
	delay: 2940
}, {
	station: {
		type: 'station',
		id: '730985',
		name: 'Jungfernheide Bahnhof (S+U), Berlin',
		coordinates: {latitude: 52.530866, longitude: 13.300781},
		products: {
			nationalExp: false,
			national: false,
			regionalExp: false,
			regional: false,
			suburban: false,
			bus: true,
			ferry: false,
			subway: true,
			tram: false,
			taxi: false
		}
	},
	when: '2017-07-03T17:53:00+02:00',
	direction: 'Rathaus Spandau (S+U), Berlin',
	line: {
		type: 'line',
		name: 'U 7',
		class: 128,
		productCode: 7,
		productName: 'U',
		mode: 'train',
		product: 'subway'
	},
	remarks: null,
	trip: 963385,
	delay: 300
}, {
	station: {
		type: 'station',
		id: '8089100',
		name: 'Berlin Jungfernheide (S)',
		coordinates: {latitude: 52.530291, longitude: 13.299451},
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
	when: '2017-07-03T17:53:00+02:00',
	direction: 'Ringbahn ->',
	line: {
		type: 'line',
		name: 'S 41',
		class: 16,
		productCode: 4,
		productName: 's',
		mode: 'train',
		product: 'suburban'
	},
	remarks: null,
	trip: 1234088,
	delay: 180
} ]
```
