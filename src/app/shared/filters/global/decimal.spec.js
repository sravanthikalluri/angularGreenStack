'use strict';

var angular = require('angular');
require('angular-mocks');

var decimalFilter = require('./decimal.filter');

describe('Decimal filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('decimalFilter', decimalFilter);

		angular.mock.module(moduleName);
	});

	it('should return empty', angular.mock.inject(function($filter) {
		var input = '';
		expect($filter('decimalFilter')(input)).toEqual('');
	}));

	it('should return decimal value', angular.mock.inject(function($filter) {
		var input = 243;
		expect($filter('decimalFilter')(input)).toEqual('243.00');
	}));


});
