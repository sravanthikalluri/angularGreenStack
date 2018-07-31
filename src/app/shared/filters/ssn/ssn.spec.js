'use strict';

var angular = require('angular');
require('angular-mocks');

var ssnFilter = require('./ssn.filter');

describe('ssn filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.ssn';

		angular
			.module(moduleName, [])
			.filter('ssnFilter', ssnFilter);

		angular.mock.module(moduleName);
	});
	it('should return a Empty string', angular.mock.inject(function($filter) {
		var ssn ='';
		expect($filter('ssnFilter')(ssn)).toEqual('');
	}));
	it('should return a string', angular.mock.inject(function($filter) {
		var ssn ='ssnnumber';
		expect($filter('ssnFilter')(ssn)).toEqual('*****mber');
	}));
});
