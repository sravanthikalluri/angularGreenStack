'use strict';

var angular = require('angular');
require('angular-mocks');

var trustedFilter = require('./trusted.filter');

describe('Trusted filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('trustedFilter', trustedFilter);

		angular.mock.module(moduleName);
	});

	it('trusted filter',angular.mock.inject(function($filter){
		var url = '/api-company';
		$filter('trustedFilter')(url);
	}));


});
