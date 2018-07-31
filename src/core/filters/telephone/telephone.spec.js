'use strict';

var angular = require('angular');
require('angular-mocks');

var tel = require('./telephone.filter');

describe('tel filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.filters.telephone.telephone';

		angular
			.module(moduleName, [])
			.filter('tel', tel);

		angular.mock.module(moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter) {

		$filter('tel')('1234567890');
	}));

	it('should return checked unchecked items', angular.mock.inject(function($filter) {

		$filter('tel')('12345678901');
	}));

	it('should return checked unchecked items', angular.mock.inject(function($filter) {

		$filter('tel')('123456789012');
	}));

	it('should return checked unchecked items', angular.mock.inject(function($filter) {

		$filter('tel')('');
	}));
});
