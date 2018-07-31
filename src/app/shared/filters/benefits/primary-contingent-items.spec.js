'use strict';

var angular = require('angular');
require('angular-mocks');

var primaryContingentItems = require('./primary-contingent-items.filter');

describe('primaryContingentItems filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.benefits';

		angular
			.module(moduleName, [])
			.filter('primaryContingentItems', primaryContingentItems);

		angular.mock.module(moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter) {
		var items = [
			{'primary': 'item1'},
			{'primary': 'item2'},
			{'primary': 'item3'}
		];
		var props = {'checked': 'item1', 'key2': 'item2', 'key3': 'item3'};
		$filter('primaryContingentItems')(items,props);
	}));
});
