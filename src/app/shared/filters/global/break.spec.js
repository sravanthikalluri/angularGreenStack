'use strict';

var angular = require('angular');
require('angular-mocks');

var breakFilter = require('./break.filter');

describe('Break filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('breakFilter', breakFilter);

		angular.mock.module(moduleName);
	});

	it('should return value with break', angular.mock.inject(function($filter) {
		var text = '/\n/g';
		expect($filter('breakFilter')(text)).toEqual('/<br />/g');
	}));


});
