'use strict';

var angular = require('angular');
require('angular-mocks');

var moment = require('moment');
var effectiveDate = require('./effective-date.filter');

describe('Effective Date Filter', function() {
	beforeEach(function() {
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};
		var moduleName = 'trinet.shared.filters.effective-date';

		angular
			.module(moduleName, [])
			.service('moment', mockMomentService)
			.filter('effectiveDate', effectiveDate);

		angular.mock.module(moduleName);
	});

	it('should return the string currently effective', angular.mock.inject(function($filter) {
		var today = new Date();
		expect($filter('effectiveDate')(today)).toEqual('Currently Effective');
	}));

	it('should return formated date', angular.mock.inject(function($filter) {
		var today = new Date('02/02/2017');
	}));
});
