'use strict';

var angular = require('angular');
require('angular-mocks');

var emptyCheckFilter = require('./empty-check.filter');

describe('Empty Check filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('emptyCheckFilter', emptyCheckFilter);

		angular.mock.module(moduleName);
	});

	it('empty check value testing', angular.mock.inject(function($filter) {
		expect($filter('emptyCheckFilter')('undefined', true)).toEqual('undefined', true);
		expect($filter('emptyCheckFilter')('null', true)).toEqual('null', true);
		expect($filter('emptyCheckFilter')(null, true)).toEqual(true);
		expect($filter('emptyCheckFilter')('', true)).toEqual(true, true);
		expect($filter('emptyCheckFilter')('-', true)).toEqual(true, true);
		expect($filter('emptyCheckFilter')('Data Unavailable', true)).toEqual(true, true);
		expect($filter('emptyCheckFilter')('Unknown', true)).toEqual(true, true);
		expect($filter('emptyCheckFilter')({}, true)).toEqual({}, true);
		expect($filter('emptyCheckFilter')(undefined, true)).toEqual(true);
		expect($filter('emptyCheckFilter')({name: 'Test'}, true)).toEqual({name: 'Test'}, true);
		expect($filter('emptyCheckFilter')()).toEqual(true);
	}));


});
