'use strict'

var angular = require('angular');
require('angular-mocks');

var telFilter = require('./tel.filter');

describe('Tel filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('telFilter', telFilter);

		angular.mock.module(moduleName);
	});

	it('Telephone Number testing with number as numeric', angular.mock.inject(function($filter) {
		var tel = '9904562623';
		expect($filter('telFilter')(tel)).toEqual('990.456.2623');
	}));

	it('Telephone Number testing with number as alphanumeric', angular.mock.inject(function($filter) {
		var tel = 'HYD9904562623';
		expect($filter('telFilter')(tel)).toEqual('HYD9904562623');
	}));

	it('Telephone Number testinng with number as a singile integer', angular.mock.inject(function($filter) {
		var tel = '1';
		expect($filter('telFilter')(tel)).toEqual('1.');
	}));

	it('Telephone Number testing with number as null', angular.mock.inject(function($filter) {
		var tel = '';
		expect($filter('telFilter')(tel)).toEqual('');
	}));


});
