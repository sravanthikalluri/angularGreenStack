'use strict';

var angular = require('angular');
require('angular-mocks');

var statusFilter = require('./status.filter');

describe('statusFilter filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.employee';

		angular
			.module(moduleName, [])
			.filter('statusFilter', statusFilter);

		angular.mock.module(moduleName);
	});

	it('should return Ongoing', angular.mock.inject(function($filter) {
		var statusValue = 'Begin';
		expect($filter('statusFilter')(statusValue)).toEqual('Ongoing');
	}));

	it('should return Ended', angular.mock.inject(function($filter) {
		var statusValue = 'End';
		expect($filter('statusFilter')(statusValue)).toEqual('Ended');
	}));
});
