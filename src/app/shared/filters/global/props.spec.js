'use strict'

var angular = require('angular');
require('angular-mocks');

var propsFilter = require('./props.filter');

describe('Props filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('propsFilter', propsFilter);

		angular.mock.module(moduleName);
	});

	it('propsFilter Filter not an  array', angular.mock.inject(function($filter) {
		var items = {};
		var props = {'key1': 'value1', 'key2': 'value2', 'key3': 'value3'};
		expect($filter('propsFilter')(items, props)).toEqual({});
	}));

	it('propsFilter Filter ', angular.mock.inject(function($filter) {
		var items = [
			{'key1': 'item1'},
			{'key2': 'item2'},
			{'key3': 'item3'}
		];
		var props = {'key1': 'item1', 'key2': 'item2', 'key3': 'item3'};
		expect($filter('propsFilter')(items, props)).toEqual([
			{'key1': 'item1'},
			{'key2': 'item2'},
			{'key3': 'item3'}
		]);
	}));


});
