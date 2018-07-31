'use strict';

var angular = require('angular');
require('angular-mocks');

var acronym = require('./acronym.filter');

describe('acronym filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.filters.acronym';

		angular
			.module(moduleName, [])
			.filter('acronym', acronym);

		angular.mock.module(moduleName);
	});

	it('should return checked unchecked items', angular.mock.inject(function($filter) {
		var f='';
		expect($filter('acronym')(f)).toEqual('');
	}));
});
