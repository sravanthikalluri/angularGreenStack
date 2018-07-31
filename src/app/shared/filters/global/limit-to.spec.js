'use strict';

var angular = require('angular');
require('angular-mocks');

var limitToFilter = require('./limit-to.filter');

describe('Limit to filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('limitToFilter', limitToFilter);

		angular.mock.module(moduleName);
	});

	it('should return sliced value', angular.mock.inject(function($filter) {
		var input = 'Hello World';
		var from = 1;
		var to = 5;
		expect($filter('limitToFilter')(input,from,to)).toEqual('ello');
	}));


});
