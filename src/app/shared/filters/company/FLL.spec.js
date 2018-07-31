'use strict';

var angular = require('angular');
require('angular-mocks');

var fllFilter = require('./FLL.filter');

describe('Fll filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.company';

		angular
			.module(moduleName, [])
			.filter('fllFilter', fllFilter);

		angular.mock.module(moduleName);
	});

	it('should return a string', angular.mock.inject(function($filter) {
		var collectName = 'jhon andrew';
		expect($filter('fllFilter')(collectName)).toEqual('J  A');
	}));

	it('should return a empty string', angular.mock.inject(function($filter) {
		var collectName;
		expect($filter('fllFilter')(collectName)).toEqual('');
	}));
});
