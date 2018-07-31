'use strict';

var angular = require('angular');
require('angular-mocks');

var moment = require('moment');
var daysFromNow = require('./days-from-now.filter');

describe('daysFromNow filter', function() {
	beforeEach(function() {
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};
		var moduleName = 'trinet.shared.filters.days-from-now';

		angular
			.module(moduleName, [])
			.service('moment', mockMomentService)
			.filter('daysFromNow', daysFromNow);

		angular.mock.module(moduleName);
	});

	it('should return the number of days from a given date', angular.mock.inject(function($filter) {
		var today = new Date();
		expect($filter('daysFromNow')(today)).toEqual('Today');
	}));
});
