'use strict';

var angular = require('angular');
require('angular-mocks');

var firstName = require('./first-name.filter');

describe('firstName filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.filters.name-filters.first-name';

		angular
			.module(moduleName, [])
			.filter('firstName', firstName);

		angular.mock.module(moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter) {

		$filter('firstName')('nirupama bommireddy');
	}));
});
