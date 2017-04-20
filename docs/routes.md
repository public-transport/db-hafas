# `routes(from, to, [opt])`

`from` and `to` must be station ids like `8011167`.

With `opt`, you can override the default options, which look like this:

```js
{
	when:           new Date(),
	via:            null, // let routes pass this station
	passedStations: false, // return stations on the way?
	transfers:      5, // maximum of 5 transfers
	transferTime:   0, // minimum time for a single transfer in minutes
	accessibility:  'none', // 'none', 'partial' or 'complete'
	bike:           false, // only bike-friendly routes
	products: {
		suburban:   true,
		subway:     true,
		tram:       true,
		bus:        true,
		ferry:      true,
		express:    true,
		regional:   true
	},
	bahncard: 	    0
}
```

## Bahncards

For *Bahncard* and other loyalty cards see: https://gist.github.com/juliuste/202bb04f450a79f8fa12a2ec3abcd72d

## Response

With `from = 8011167` and `to = 8011113`, the response looks like this:

```js
[ {
	parts: [ {
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
		to: {
			type: 'station',
			id: 8089073,
			name: 'Berlin Südkreuz (S)',
			latitude: 52.476131,
			longitude: 13.365144,
			products: {
				nationalExp: false,
				national: false,
				regionalExp: false,
				regional: false,
				suburban: true,
				bus: false,
				ferry: false,
				subway: false,
				tram: false,
				taxi: false
			}
		},
		start: 2016-07-29T23:48:00.000Z,
		end: 2016-07-30T00:33:00.000Z,
		product: {
			name: 'S 41',
			nr: 41,
			class: 16,
			productCode: 4,
			productName: 's'
		},
		direction: 'Ringbahn ->'
	} ],
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
	departurePlatform 1,
	start: 2016-07-29T23:48:00.000Z,
	to: {
		type: 'station',
		id: 8089073,
		name: 'Berlin Südkreuz (S)',
		latitude: 52.476131,
		longitude: 13.365144,
		products: {
			nationalExp: false,
			national: false,
			regionalExp: false,
			regional: false,
			suburban: true,
			bus: false,
			ferry: false,
			subway: false,
			tram: false,
			taxi: false
		}
	},
	arrivalPlatform: 1,
	end: 2016-07-30T00:33:00.000Z
} ]
```
