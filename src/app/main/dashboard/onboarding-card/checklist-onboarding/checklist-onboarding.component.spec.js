
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnChecklistOnboardingController = require('./checklist-onboarding.component');

describe('checklist-onboarding component', function () {
	var ctrl;
	var $scope;
	var DS;
	beforeEach(function () {

		var moduleName = 'app.main.dashboard.onboarding-card.checklist-onboarding';
		var mockDSService = function() {
			return {

			}
		};
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.component('tnChecklistOnboardingController', tnChecklistOnboardingController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_) {
		$scope = $rootScope.$new();
		DS=_DS_;

		var locals = {
			$scope: $scope,
			DS:DS
		};
		ctrl = $componentController('tnChecklistOnboardingController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		//ctrl.onInit();
	});

});
