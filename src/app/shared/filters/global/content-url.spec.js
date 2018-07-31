'use strict';

var angular = require('angular');
require('angular-mocks');

var contentUrlFilter = require('./content-url.filter');

describe('contentUrl filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('contentUrlFilter', contentUrlFilter);

		angular.mock.module(moduleName);
	});

	it('should return Undefined', angular.mock.inject(function($filter) {
		var docUrl = '/v1/global';
		expect($filter('contentUrlFilter')(docUrl)).toEqual('/api-content/v1/global');
	}));


});
