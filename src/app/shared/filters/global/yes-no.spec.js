'use strict';

var angular = require('angular');
require('angular-mocks');

var emptyCheckFilter = require('./empty-check.filter');
var yesNoFilter = require('./yes-no.filter');

describe('contentUrl filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('emptyCheckFilter', emptyCheckFilter)
			.filter('yesNoFilter', yesNoFilter);

		angular.mock.module(moduleName);
	});

	it('should return hypen', angular.mock.inject(function($filter) {
		var input = '-';
		expect($filter('yesNoFilter')(input)).toEqual('-');
	}));

	it('should return yes', angular.mock.inject(function($filter) {
		var input = 'Y';
		expect($filter('yesNoFilter')(input)).toEqual('Yes');
	}));


});
