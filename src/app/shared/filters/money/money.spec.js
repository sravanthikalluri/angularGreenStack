'use strict';

var angular = require('angular');
require('angular-mocks');

var moneyFilter = require('./money.filter');

describe('Money filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.money';

		angular
			.module(moduleName, [])
			.filter('moneyFilter', moneyFilter);

		angular.mock.module(moduleName);
	});

	it('test money filter with undefined', angular.mock.inject(function($filter) {
		var input = 'undefined';
		expect($filter('moneyFilter')(input)).toEqual('**ined');
	}));


	it('test money filter with data', angular.mock.inject(function($filter) {
		var input = '123456789';
		expect($filter('moneyFilter')(input)).toEqual('**6789');
	}));
});
