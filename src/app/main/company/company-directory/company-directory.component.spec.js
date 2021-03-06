'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyDirectory = require('./company-directory.component');

describe('tn-company-directory component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.main.company.company-directory.tn-company-directory';

		angular
			.module(moduleName, [])
			.component('tnCompanyDirectory', tnCompanyDirectory);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('tnCompanyDirectory', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
	});

});

