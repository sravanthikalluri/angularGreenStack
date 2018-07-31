'use strict';

var angular = require('angular');
require('angular-mocks');

var checkUnCheckFilter = require('./check-un-check.filter');

describe('checkUnCheck filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.employee';

		angular
			.module(moduleName, [])
			.filter('checkUnCheckFilter', checkUnCheckFilter);

		angular.mock.module(moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter) {
		var items = [
			{'isChecked': 'item1'},
			{'isChecked': 'item2'},
			{'isChecked': 'item3'}
		];
		var props = {'checked': 'item1', 'key2': 'item2', 'key3': 'item3'};
		$filter('checkUnCheckFilter')(items,props);
	}));
});
