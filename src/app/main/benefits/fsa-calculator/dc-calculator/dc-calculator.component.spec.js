'use strict';

var angular = require('angular');
require('angular-mocks');

var dcCalculator = require('./dc-calculator.component');

describe('DC Calculator component', function (){

	var ctrl;
	var $componentController;
	var $scope;
	var dcCalculatorService;

	beforeEach(function() {
		var moduleName =  'app.main.benefits.fsa-calculator';
		var mockdcCalculatorService = function() {
			return {
				calculateSuggestedContribution: function () {
					return 0.255;

				},
				calculateFederalTaxSavings: function () {

				},
				calculateFicaSavings: function () {

				}
			}
		}
		angular
			.module(moduleName, [])
			.service('dcCalculatorService', mockdcCalculatorService)
			.component('dcCalculator', dcCalculator);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, _$componentController_, _dcCalculatorService_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		dcCalculatorService = _dcCalculatorService_;
		var locals = {
			$scope: $scope,
			dcCalculatorService: dcCalculatorService
		};
		ctrl = $componentController('dcCalculator', locals ,null);
	}));
   it('should initlize the component',function() {
   	    ctrl.$onInit();
   });
   it('should calculateSavings ',function() {
	   ctrl.calculateSavings();
	});

   it('should calculate savings if annaual income < 5000',function() {
	   ctrl.annualIncome = 100;
   	   ctrl.calculateSavings();
   });

   it('should show msg message in dependents are empty',function() {
   	    ctrl.numDependents  = "";
   	    ctrl.calculateSavings();
   });
   it('should calculate totalExpenses',function() {
      	ctrl.calculateTotalExpenses();
   });
   it('should calculate suggested expenses',function() {
   	   ctrl.calculateSuggestedContribution();
   });
   it('should reset all the values',function() {
   	  ctrl.resetValues();
   });
   it('should calculate tax savings',function() {
   	   ctrl.calculateTaxSavings();
   });
});
