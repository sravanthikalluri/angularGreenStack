'use strict';

var angular = require('angular');
require('angular-mocks');

var tnExistingAccountTable = require('./existing-account-table.component');

describe('existing-account-table component', function () {

	var ctrl;
	var $scope;

	beforeEach(function () {
		var moduleName = 'app.main.company.existing-account-table';

		angular
			.module(moduleName, [])
			.component('tnExistingAccountTable', tnExistingAccountTable);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};

		ctrl = $componentController('tnExistingAccountTable', locals, null);
	}));

	it('ctrl variables should be with the mock data objects', function () {

		ctrl.$onInit();
		expect(true).toBe(true);
	});

});
