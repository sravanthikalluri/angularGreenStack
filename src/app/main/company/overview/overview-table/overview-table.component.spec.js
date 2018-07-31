'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCompanyOverviewTable = require('./overview-table.component');

describe('overview-table component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.main.company.overview-table';

		angular
			.module(moduleName, [])
			.component('tnCompanyOverviewTable', tnCompanyOverviewTable);

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
		ctrl = $componentController('tnCompanyOverviewTable', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
	});

});

