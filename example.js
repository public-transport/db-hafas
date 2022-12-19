import {inspect} from 'node:util'
import {createDbHafas as createHafas} from './index.js'
// import {createThrottledClient} from './throttle.js'
// import {createRetryingClient} from './retry.js'

const hafas = createHafas('db-hafas-example')
// const hafas = createThrottledClient('db-hafas example', {
// 	throttlingLimit: 5,
// 	throttlingInterval: 10000 // 10s
// })
// const hafas = createRetryingClient('db-hafas example', {
// 	retryOpts: {retries: 2}
// })

// let data = await hafas.locations('Berlin Jungfernheide')
// let data = await hafas.locations('ATZE Musiktheater', {poi: true, addressses: false, fuzzy: false})
// let data = await hafas.nearby(52.4751309, 13.3656537, {results: 1})
// let data = await hafas.stop('8089083')

// let data = await hafas.departures('8011167', {duration: 1})

// Berlin Jungfernheide to München Hbf
let data = await hafas.journeys('8011167', '8000261', {results: 1})
// {
// 	const [journey] = data.journeys
// 	data = await hafas.refreshJourney(journey.refreshToken, {
// 		stopovers: true,
// 	})
// }
// {
// 	const [journey] = data.journeys
// 	const leg = journey.legs[0]
// 	data = await hafas.trip(leg.tripId, leg.line.name, {
// 		polyline: true,
// 	})
// }

// let data = await hafas.radar({
// 	north: 52.5522,
// 	west: 13.3489,
// 	south: 52.5405,
// 	east: 13.3705
// }, {results: 10})

console.log(inspect(data, {depth: null, colors: true}))
