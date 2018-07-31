'use strict';

var angular = require('angular');
require('angular-mocks');

var underscrollFilter = require('./underscroll.filter');

describe('underscroll filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.underscroll';

		angular
			.module(moduleName, [])
			.filter('underscrollFilter', underscrollFilter);

		angular.mock.module(moduleName);
	});
	it('should return a Empty string', angular.mock.inject(function($filter) {
		var under ='';
		expect($filter('underscrollFilter')(under)).toEqual('');
	}));
	it('should return a string', angular.mock.inject(function($filter) {
		var under ='ssnnumber';
		expect($filter('underscrollFilter')(under)).toEqual('ssnnumber');
	}));
});
