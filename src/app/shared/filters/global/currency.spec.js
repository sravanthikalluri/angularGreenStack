'use strict';

var angular = require('angular');
require('angular-mocks');

var emptyCheckFilter = require('./empty-check.filter');
var CurrencyFilter = require('./currency.filter');

describe('Currency filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('emptyCheckFilter', emptyCheckFilter)
			.filter('CurrencyFilter', CurrencyFilter);

		angular.mock.module(moduleName);
	});

	it('should return hypen', angular.mock.inject(function($filter) {
		var data;
		expect($filter('CurrencyFilter')(data)).toEqual('-');
	}));

	it('should return hypen', angular.mock.inject(function($filter) {
		var data=0;
		expect($filter('CurrencyFilter')(data)).toEqual('-');
	}));

	it('should return negative currency', angular.mock.inject(function($filter) {
		var data = -123;
		expect($filter('CurrencyFilter')(data)).toEqual('-$123.00');
	}));

	it('should return positive value', angular.mock.inject(function($filter) {
		var data = 12;
		expect($filter('CurrencyFilter')(data)).toEqual('$12.00');
	}));

	it('should return positive value', angular.mock.inject(function($filter) {
		var data = '0';
		expect($filter('CurrencyFilter')(data)).toEqual('$0.00');
	}));
});
