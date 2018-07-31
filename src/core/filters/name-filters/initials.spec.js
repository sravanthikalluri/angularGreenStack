'use strict';

var angular = require('angular');
require('angular-mocks');

var initials = require('./initials.filter');

describe('initials filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.filters.name-filters.initials';

		angular
			.module(moduleName, [])
			.filter('initials', initials);

		angular.mock.module(moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter) {

		$filter('initials')('bommireddy');
	}));
});
