'use strict';

var angular = require('angular');
require('angular-mocks');

var propsWithFilter = require('./props-with.filter');

describe('Props With filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('propsWithFilter', propsWithFilter);

		angular.mock.module(moduleName);
	});

	it('propsWithFilter Filter not an  array', angular.mock.inject(function($filter) {
		var items = [
					{'key1': 'item1'}
				];
		var props = {'key1': '1', 'key2': '2', 'key3': '3'};
		expect($filter('propsWithFilter')(items, props)).toEqual([{ key1 : 'item1' }]);
	}));

});
