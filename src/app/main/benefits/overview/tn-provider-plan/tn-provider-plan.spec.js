'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProviderPlan  = require('./tn-provider-plan.component');

describe('tn-provider-plan  component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',

		moduleName: 'trinet.main.benefits.tn-provider-plan',


		locals: {}
	};





	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('tnProviderPlan ', tnProviderPlan );

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] =$componentController;
		obj.locals = {
			$scope: obj['$scope'],

		};

		obj['ctrl'] = obj['$componentController']('tnProviderPlan', obj.locals, null);
	}));





});

