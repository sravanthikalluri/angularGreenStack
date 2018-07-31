'use strict';

var angular = require('angular');
require('angular-mocks');

var paychecksSymmetryCalculator = require('./paychecks-symmetry-calculator.component');

describe('paychecks-symmetry-calculator component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.money.paychecks-symmetry-calculator.paychecks-symmetry-calculator',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('paychecksSymmetryCalculator', paychecksSymmetryCalculator);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('paychecksSymmetryCalculator', obj.locals, null);
	}));
	it('hideCalc function', function () {
		obj['ctrl'].hideCalc();
	});



});

