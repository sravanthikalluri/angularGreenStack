'use strict';

var angular = require('angular');
require('angular-mocks');

var companyComponent = require('./company.component');

describe('company component', function() {
	beforeEach(function() {

		var moduleName = 'trinet.main.company.component';

		angular
			.module(moduleName, [])
			.component('companyComponent', companyComponent);
		angular.mock.module(moduleName);
	});

	it('empty controller', inject(function($rootScope, $compile) {

	}));
});
