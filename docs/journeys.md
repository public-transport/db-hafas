# `journeys(from, to, [opt])`

`from` and `to` must be station ids like `'8011167'`.

With `opt`, you can override the default options, which look like this:

```js
{
	results:        5, // how many journeys?
	when:           new Date(),
	via:            null, // let journeys pass this station
	passedStations: false, // return stations on the way?
	transfers:      5, // maximum of 5 transfers
	transferTime:   0, // minimum time for a single transfer in minutes
	accessibility:  'none', // 'none', 'partial' or 'complete'
	bike:           false, // only bike-friendly journeys
	products: {
		suburban:   true,
		subway:     true,
		tram:       true,
		bus:        true,
		ferry:      true,
		express:    true,
		regional:   true
	},
	loyaltyCard:    {type: journeys.NONE}
}
```

## Loyalty Cards

Possible values for `loyaltyCard`:

```js
{ // Bahncard (Germany)
	type: journeys.BAHNCARD,
	discount: 25, // or 50 for 50% discount
	class: 2 // or 1 for first class
}
```

```js
{ // VORTEILScard (Austria)
	type: journeys.VORTEILSCARD
}
```

```js
{ // HalbtaxAbo (Switzerland)
	type: journeys.HALBTAXABO,
	railplus: true
}
```

```js
{ // Voordeelurenabo (Netherlands)
	type: journeys.VOORDEELURENABO,
	railplus: true
}
```

```js
{
	type: journeys.SHCARD
}
```

```js
{ // General-Abonnement (Switzerland)
	type: journeys.GENERALABONNEMENT
}
```

## Response

With `from = '8011167'`, `to = '8000261'` and `results: 1`, the response may look like this:

```js
[ {
	parts: [
		{
			id: '1|1234649|13|80|3072017',
			origin: {
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
					bus: true,
					ferry: false,
					subway: true,
					tram: false,
					taxi: false
				}
			},
			destination: {
				type: 'station',
				id: '8089073',
				name: 'Berlin Südkreuz (S)',
				coordinates: {latitude: 52.474962, longitude: 13.365881},
				products: {
					nationalExp: true,
					national: true,
					regionalExp: true,
					regional: true,
					suburban: true,
					bus: true,
					ferry: false,
					subway: false,
					tram: false,
					taxi: false
				}
			},
			departure: '2017-07-03T18:09:00+02:00',
			arrival: '2017-07-03T18:27:00+02:00',
			delay: 240,
			line: {
				type: 'line',
				name: 'S 42',
				class: 16,
				productCode: 4,
				productName: 's',
				mode: 'train',
				product: 'suburban'
			},
			direction: 'Ringbahn <-',
			departurePlatform: '6',
			arrivalPlatform: '12'
		}, {
			origin: {
				type: 'station',
				id: '8089073',
				name: 'Berlin Südkreuz (S)',
				coordinates: {latitude: 52.474962, longitude: 13.365881},
				products: { /* … */ }
			},
			destination: {
				type: 'station',
				id: '8011113',
				name: 'Berlin Südkreuz',
				coordinates: {latitude: 52.47623, longitude: 13.365854}
			},
			departure: '2017-07-03T18:25:00+02:00',
			arrival: '2017-07-03T18:32:00+02:00',
			mode: 'walking'
		}, {
			id: '1|149492|0|80|3072017',
			origin: {
				type: 'station',
				id: '8011113',
				name: 'Berlin Südkreuz',
				coordinates: {latitude: 52.47623, longitude: 13.365854}
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
			departure: '2017-07-03T18:34:00+02:00',
			departurePlatform: '3',
			arrival: '2017-07-04T00:49:00+02:00',
			arrivalPlatform: '15',
			delay: 0,
			line: {
				type: 'line',
				name: 'ICE 1517',
				class: 1,
				productCode: 0,
				productName: 'ICE',
				mode: 'train',
				product: 'nationalExp'
			},
			direction: 'München Hbf'
		}
	],
	origin: {
		type: 'station',
		id: '8089100',
		name: 'Berlin Jungfernheide (S)',
		coordinates: {latitude: 52.530291, longitude: 13.299451},
		products: { /* … */ }
	},
	destination: {
		type: 'station',
		id: '8000261',
		name: 'München Hbf',
		coordinates: {latitude: 48.140364, longitude: 11.558735},
		products: { /* … */ }
	},
	departure: '2017-07-03T18:09:00+02:00',
	arrival: '2017-07-04T00:49:00+02:00',
	price: {amount: 132}
} ]
```
