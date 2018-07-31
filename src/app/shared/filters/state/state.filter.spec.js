'use strict';

var angular = require('angular');
require('angular-mocks');

var stateFilter = require('./state.filter');

describe('state filter', function() {

	var US_STATES;

	beforeEach(function() {

		var mockUS_STATES  = function () {
			return {
				key : ""
			}
		};

		var moduleName = 'trinet.shared.filters.state';

		angular
			.module(moduleName, [])
			.filter('US_STATES',mockUS_STATES)
			.filter('stateFilter', stateFilter);


		angular.mock.module(moduleName);
	});
	/*it('should return a Empty string', angular.mock.inject(function($filter) {
		var key ='';
		expect($filter('stateFilter')(key)).toEqual('');
	}));
	it('should return a string', angular.mock.inject(function($filter) {
		var key ='AZ';
		expect($filter('stateFilter')(under)).toEqual('AZ');
	}));*/
});
