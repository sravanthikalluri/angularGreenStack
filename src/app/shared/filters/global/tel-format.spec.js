'use strict';

var angular = require('angular');
require('angular-mocks');

var telFormatFilter = require('./tel-format.filter');

describe('Tel Format filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('telFormatFilter', telFormatFilter);

		angular.mock.module(moduleName);
	});

	it('telFormat filter testing with 10 digits',angular.mock.inject(function($filter) {
		var number = 1234567890;
		$filter('telFormatFilter')(number);
	}));

	it('telFormat filter testing with 11 digits',angular.mock.inject(function($filter) {
		var number = 12345678901;
		$filter('telFormatFilter')(number);
	}));

	it('telFormat filter testing with 12 digits',angular.mock.inject(function($filter) {
		var number = 123456789012;
		$filter('telFormatFilter')(number);
	}));

	it('telFormat filter testing with 9 digits',angular.mock.inject(function($filter) {
		var number = 123456789;
		$filter('telFormatFilter')(number);
	}));

	it('telFormat filter testing with not digits',angular.mock.inject(function($filter) {
		var number = "asdf";
		$filter('telFormatFilter')(number);
	}));


});
