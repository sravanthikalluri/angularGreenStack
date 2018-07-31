'use strict';

var angular = require('angular');
require('angular-mocks');

var planComparison = require('./plan-comparison.component');

describe('plan-comparison component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'num':'num',
		mockDSService: function () {
			return {}
		},
		moduleName: 'trinet.main.benefits.plan-comparison',
		locals: {}
	};


	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.component('planComparison',planComparison);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope,$componentController, _DS_) {

		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = $componentController;
		obj['DS'] = _DS_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope:obj['$scope'],
			DS: obj['DS'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('planComparison', obj.locals, null);
	}));
	it('should initilize the controller',function() {
		obj['ctrl'].$onInit();

	});


	it('should return  array of  numbers controller',function() {
		obj['ctrl'].getPdfLink(obj.num);

	});

});


