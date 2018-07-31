'use strict';

var angular = require('angular');
require('angular-mocks');

var ellipsizeFilter = require('./ellipsize.filter');

describe('Ellipsize filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.ellipsize';

		angular
			.module(moduleName, [])
			.filter('ellipsizeFilter', ellipsizeFilter);

		angular.mock.module(moduleName);
	});

	it('should return ellipsized string', angular.mock.inject(function($filter) {
		var input = "Ellipsize filter of filter";
		var length = 0;
		$filter('ellipsizeFilter')(input,length);
	}));

	it('should return input', angular.mock.inject(function($filter) {
		var input;
		var length = 0;
		$filter('ellipsizeFilter')(input,length);
	}));

	it('should return input if no length', angular.mock.inject(function($filter) {
		var input = "ellipsize";
		var length;
		$filter('ellipsizeFilter')(input,length);
	}));
});
