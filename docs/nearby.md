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
	id: 8011113,
	name: 'Berlin Südkreuz',
	latitude: 52.475043,
	longitude: 13.365315,
	products: {
		nationalExp: true,
		national: true,
		regionalExp: true,
		regional: true,
		suburban: false,
		bus: false,
		ferry: false,
		subway: false,
		tram: false,
		taxi: false
	},
	distance: 25
} ]
```
