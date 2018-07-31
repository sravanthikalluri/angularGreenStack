'use strict';

var angular = require('angular');
require('angular-mocks');

var hcCalculator = require('./hc-calculator.component');

describe('hcCalculator component ', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var hcCalculatorService;
	var $filter;
	var deferred;
	var mockData = {
		contributionLimits: {
			min_annual_contrib: 'value',
			max_annual_contrib: 'value'
		}
	};


	beforeEach(function() {
		var moduleName = 'app.main.benefits.fsa-calculator';

		var mock$timeoutService = function(){ };
		var mockGsoService = function(){ return {
			getAppConfig: function () {
				return {
					peoId: 'AMB'
				}
			}

		}};
		var mockDSService = function(){ return {}};
		var mock$filterService = function(){ return {}};
		var mockhcCalculatorServiceService = function(){ return {
			calculateSuggestedContribution: function () {
				return 0.255;
			},
			calculateFederalTaxSavings: function () {

			},
			calculateFicaSavings: function () {

			}
		}};

		angular
			.module(moduleName, [])
			.service('$timeout', mock$timeoutService)
			.service('DS', mockDSService)
			.service('$filter', mock$filterService)
			.service('hcCalculatorService', mockhcCalculatorServiceService)
			.component('hcCalculator', hcCalculator);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _$filter_, _hcCalculatorService_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		hcCalculatorService = _hcCalculatorService_;
		$filter = _$filter_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS
		};

		ctrl = $componentController('hcCalculator', locals ,null);
	}));

	/*it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});
	it('$onInit function test reject', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({data: {_error : {message: 'message'}}});
		$scope.$digest();
	});*/

	it('calculateSavings  function test with annualIncome Empty', function () {
		ctrl.calculateSavings();
	});
	it('calculateSavings  function test with annual income less than 5000', function () {
		ctrl.annualIncome = '4500';
		ctrl.calculateSavings();
		ctrl.calculateTotalExpenses ();
		ctrl.calculateSuggestedContribution ();
		ctrl.calculateTaxSavings ();

	});

	it('calculateSavings  function test with numDependents Empty', function () {
		ctrl.numDependents = '1';
		ctrl.calculateSavings();
	});


	/*it('calculateTotalExpenses  function test', function () {
		ctrl.calculateTotalExpenses();
	});

	it('calculateSuggestedContribution  function test', function () {
		ctrl.calculateSuggestedContribution();
	});

	it('calculateTaxSavings  function test', function () {
		ctrl.calculateTaxSavings();
	});
*/
	it('resetValues  function test', function () {
		ctrl.resetValues();
	});


});

