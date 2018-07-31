
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnLifeAndDisabilityCoverageController = require('./life-and-disability-coverage.component');

describe('life-and-disability-coverage component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'app.main.benefits.resources.additional-resources.life-and-disability-coverage';
		angular
			.module(moduleName, [])
			.component('tnLifeAndDisabilityCoverageController', tnLifeAndDisabilityCoverageController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnLifeAndDisabilityCoverageController', locals, null);
	}));

	it('ctrl variables should be with mock data objects',function(){
		ctrl.$onInit();
	});

});
