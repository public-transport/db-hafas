# `locations(query, [opt])`

`query` must be an string (e.g. `Berlin Jungfernheide`).

With `opt`, you can override the default options, which look like this:

```js
{
	  fuzzy:     true // find only exact matches?
	, results:   10 // how many search results?
	, stations:  true
	, addresses: true
	, poi:       true // points of interest
}
```

## Response

With `query = 'Berlin Jungfernheide'`, the response looks like this:

```js
[
	{
		type: 'station',
		id: 8011167,
		name: 'Berlin Jungfernheide',
		latitude: 52.530273,
		longitude: 13.299433
	},
	// …
	{
		type: 'address',
		name: 'Berlin - Charlottenburg, Am Bahnhof Jungfernheide',
		latitude: 52.531837,
		longitude: 13.309348
	},
	// …
	{
		type: 'poi',
		id: 990381196,
		name: 'Berlin, Freibad Jungfernheide (Sport)',
		latitude: 52.543999,
		longitude: 13.272897
	}
]
```
