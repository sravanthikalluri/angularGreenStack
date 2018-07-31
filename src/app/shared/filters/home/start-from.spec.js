'use strict';

var angular = require('angular');
require('angular-mocks');

var startFromFilter = require('./start-from.filter');

describe('startFrom filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.home';

		angular
			.module(moduleName, [])
			.filter('startFromFilter', startFromFilter);

		angular.mock.module(moduleName);
	});

	it('should return value', angular.mock.inject(function($filter) {
		var input = 'Home';
		var id = 0;
		expect($filter('startFromFilter')(input,id)).toEqual('ome');
	}));


});
