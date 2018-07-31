'use strict';

var angular = require('angular');
require('angular-mocks');

var dateFormatFilter = require('./date-format.filter');

describe('dateFormat filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('dateFormatFilter', dateFormatFilter);

		angular.mock.module(moduleName);
	});

	it('should return hypen', angular.mock.inject(function($filter) {
		var date = null;
		expect($filter('dateFormatFilter')(date)).toEqual('-');
	}));

/*	it('should return hypen', angular.mock.inject(function($filter) {
		var date = '25/11/2016';
		expect($filter('dateFormatFilter')(date)).toEqual('11/25/2016');
	}));*/


});
