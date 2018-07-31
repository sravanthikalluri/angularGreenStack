'use strict';

var angular = require('angular');
require('angular-mocks');

var uniqueFilter = require('./unique.filter');

describe('Unique filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('uniqueFilter', uniqueFilter);

		angular.mock.module(moduleName);
	});

	it('uniqueFilter Filter ', angular.mock.inject(function($filter) {
		var items = [
			{'key1': 'item1'},
			{'key2': 'item2'},
			{'key1': 'item1'}
		];
		expect($filter('uniqueFilter')(items, 'key1')).toEqual([
			{'key1': 'item1'},
			{'key2': 'item2'}
		]);
	}));


});
