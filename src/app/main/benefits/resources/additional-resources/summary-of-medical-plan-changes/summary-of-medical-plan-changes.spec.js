'use strict';

var angular = require('angular');
require('angular-mocks');

var summaryOfMedicalPlanChanges = require('./summary-of-medical-plan-changes.component');

describe('summary-of-medical-plan-changes component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		mockDSService: function () {
			return {}
		},
		moduleName: 'trinet.main.benefits.summary-of-medical-plan-changes',
		locals: {}
	};


	beforeEach(function () {

		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.component('summaryOfMedicalPlanChanges', summaryOfMedicalPlanChanges);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, _DS_) {

		obj['$scope'] = $rootScope.$new();
		obj['DS'] = _DS_;
		obj['$componentController'] = $componentController;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('summaryOfMedicalPlanChanges', obj.locals, null);
	}));
	it('should initilize the controller', function () {
		obj['ctrl'].$onInit();

	});


});



