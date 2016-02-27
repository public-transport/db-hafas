**Please use to the more advanced [`pbock/fahrplan` client](https://github.com/pbock/fahrplan).**

# db-hafas

*db-hafas* is a client for the [Deutsche Bahn schedule API](http://data.deutschebahn.com/apis/fahrplan/).

[![build status](https://img.shields.io/travis/derhuerst/db-hafas.svg)](https://travis-ci.org/derhuerst/db-hafas)
[![dependency status](https://img.shields.io/david/derhuerst/db-hafas.svg)](https://david-dm.org/derhuerst/db-hafas#info=dependencies)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/db-hafas.svg)](https://david-dm.org/derhuerst/db-hafas#info=devDependencies)


## Installing

```shell
npm install db-hafas
```


## Usage

```javascript
const client = require('db-hafas')('my-api-key')
client.locations('ostbahnhof').then(console.log)
```

This will give you the following results. – *I know, great accuracy…*

```js
[
	{id: '008010255', name: 'Berlin Ostbahnhof',   position: [52.510972, 13.434567]},
	{id: '008011160', name: 'Berlin Hauptbahnhof', position: [52.525589, 13.369548]},
	{id: '008103000', name: 'Wien Hauptbahnhof',   position: [48.184923, 16.375864]},
	{id: '008000774', name: 'Baden Baden Bahnhof', position: [48.790328, 8.190827 ]}
]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-hafas/issues).
