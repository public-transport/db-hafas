'use strict'

sinon =    require 'sinon'
require('sinon-promise') sinon
nodeunit = require 'nodeunit'
url =      require 'url'

requireMock = sinon.stub()
mock = (k, v) -> requireMock.withArgs(k).returns v

mock 'url',             require 'url'
mock 'extend',          require 'extend'
mock 'path',            require 'path'
mock 'request-promise', requestMock = sinon.promise()

scope = nodeunit.utils.sandbox './index.js', require: requireMock, module: {}
client = scope.module.exports 'foo'



module.exports =

	locations:

		'calls request correctly': (test) ->
			requestMock.resolves JSON.stringify LocationList: StopLocation: [
				{id: 1, name: 'one',   lat: 10, lon: 11}
				{id: 2, name: 'two',   lat: 12, lon: 13}
				{id: 3, name: 'three', lat: 14, lon: 15}
			]
			client.locations('bar').then (data) ->
				# todo: make this more elegant
				test.strictEqual data[0].id, 1
				test.strictEqual data[0].name, 'one'
				test.strictEqual data[0].position[0], 10
				test.strictEqual data[0].position[1], 11
				test.strictEqual data[0].position.length, 2
				test.strictEqual data[1].id, 2
				test.strictEqual data[1].name, 'two'
				test.strictEqual data[1].position[0], 12
				test.strictEqual data[1].position[1], 13
				test.strictEqual data[1].position.length, 2
				test.strictEqual data[2].id, 3
				test.strictEqual data[2].name, 'three'
				test.strictEqual data[2].position[0], 14
				test.strictEqual data[2].position[1], 15
				test.strictEqual data[2].position.length, 2
				test.strictEqual requestMock.callCount, 1
				test.strictEqual url.parse(requestMock.firstCall.args[0]).pathname, '/bin/rest.exe/location.name'
				test.done()
