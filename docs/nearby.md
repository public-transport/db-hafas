# `nearby(latitude, longitude, [opt])`

`latitude` and `longitude` must be GPS coordinates like `52.4751309` and `13.3656537`.

With `opt`, you can override the default options, which look like this:

```js
{
	results:  8, // maximum number of results
	distance: null, // maximum walking distance in meters
	poi:      false, // return points of interest?
	stations: true, // return stations?
}
```

## Response

With `latitude = 52.4751309`, `longitude = 13.3656537` and `results: 1`, the response looks like this:

```js
[ {
	type: 'station',
	id: '8011113',
	name: 'Berlin Südkreuz',
	coordinates: {latitude: 52.47623, longitude: 13.365854},
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
	},
	distance: 25
}, {
	type: 'station',
	id: '8089073',
	name: 'Berlin Südkreuz (S)',
	coordinates: {latitude: 52.474962, longitude: 13.365881},
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
	},
	distance: 116
} ]
```
