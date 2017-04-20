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
	loyaltyCard:    {type: routes.NONE}
}
```

## Loyalty Cards

Possible values for `loyaltyCard`:

```js
{ // Bahncard (Germany)
	type: routes.BAHNCARD,
	discount: 25, // or 50 for 50% discount
	class: 2 // or 1 for first class
}
```

```js
{ // VORTEILScard (Austria)
	type: routes.VORTEILSCARD
}
```

```js
{ // HalbtaxAbo (Switzerland)
	type: routes.HALBTAXABO,
	railplus: true
}
```

```js
{ // Voordeelurenabo (Netherlands)
	type: routes.VOORDEELURENABO,
	railplus: true
}
```

```js
{
	type: routes.SHCARD
}
```

```js
{ // General-Abonnement (Switzerland)
	type: routes.GENERALABONNEMENT
}
```

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
			platform: '1',
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
			platform: '3',
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
		platform: '1',
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
	start: 2016-07-29T23:48:00.000Z,
	to: {
		type: 'station',
		id: 8089073,
		name: 'Berlin Südkreuz (S)',
		latitude: 52.476131,
		longitude: 13.365144,
		platform: '3',
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
	end: 2016-07-30T00:33:00.000Z
} ]
```
