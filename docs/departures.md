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
		id: 730985,
		name: 'Jungfernheide Bahnhof (S+U), Berlin',
		latitude: 52.530866,
		longitude: 13.300781,
		products: /* … */
	},
	when: 2016-07-29T23:25:00.000Z,
	delay: 0
	direction: 'Rudow (U), Berlin',
	product: {
		name: 'U 7',
		nr: 7,
		class: 128,
		productCode: 7,
		productName: 'U'
	},
	remarks: null,
	trip: 797216,
}, {
	station: {
		type: 'station',
		id: 730985,
		name: 'Jungfernheide Bahnhof (S+U), Berlin',
		latitude: 52.530866,
		longitude: 13.300781,
		products: /* … */
	},
	when: 2016-07-29T23:26:00.000Z,
	delay: 0,
	direction: 'Charlottenburg, Goerdelersteg',
	product: {
		name: 'Bus M21',
		nr: 21,
		class: 32,
		productCode: 5,
		productName: 'Bus'
	},
	remarks: null,
	trip: 782945
} ]
```
