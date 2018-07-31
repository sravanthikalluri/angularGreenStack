'use strict';

var angular = require('angular');
require('angular-mocks');

var tnDcCalculator = require('./dc-calculator.service');

describe('dcCalculatorService service', function (){
	var gso;
	var DS;
	var ctrl;
	beforeEach(function() {
		var moduleName = 'app.main.benefits.fsa-calculator.dc-calculator';

		var mockgsoService = function(){ return {}};
		var mockDSService = function() {
			return {};
		}

		angular
			.module(moduleName, [])
			.service('gso',mockgsoService)
			.service('DS',mockDSService)
			.service('tnDcCalculator', tnDcCalculator);

		angular.mock.module(moduleName);
	});


	/*beforeEach(inject(function(_$componentController_, $rootScope ,_DS_,_gso_){
		$componentController = _$componentController_;
	//	DcCalculatorService = _dcCalculatorService_;
		DS=_DS_;
		gso = _gso_;
		$scope = $rootScope.$new();
		var locals = {
			$scope: $scope,
			gso:gso,
			DS:DS
		};
		//ctrl = $componentController('tnDcCalculator', locals ,null);
	}));*/

	it('calculateSuggestedContribution function test1 expenses lessthan min contribution ', inject(function (tnDcCalculator) {
		//DcCalculatorService.calculateSuggestedContribution();

		tnDcCalculator.calculateSuggestedContribution(10);
	}));
	it('calculateSuggestedContribution function test1 expenses greater than  max contribution ', inject(function (tnDcCalculator) {
		//DcCalculatorService.calculateSuggestedContribution();
		tnDcCalculator.calculateSuggestedContribution(100000);
	}));

	it('should calculate finacial savings',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFicaSavings(10000);
	}));
	it('should calculate finacial savings greater than socialsecurity amount',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFicaSavings(100000);
	}));
	it('should calculate federal tax savings',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(0,10000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(0,100000,0);
	}));

	it('should calculate federal tax savings against tax 2',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(1,10000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax against tax 2',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(1,100000,0);
	}));

	it('should calculate federal tax savings against tax 3',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(2,20000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax against tax 3',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(2,200000,0);
	}));

	it('should calculate federal tax savings against tax 4',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(3,40000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax against tax 4',inject(function(tnDcCalculator) {
		tnDcCalculator.calculateFederalTaxSavings(3,400000,0);
	}));
});

