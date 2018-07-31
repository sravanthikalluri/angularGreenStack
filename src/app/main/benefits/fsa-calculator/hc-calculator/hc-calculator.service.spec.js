'use strict';

var angular = require('angular');
require('angular-mocks');

var tnHcCalculator = require('./hc-calculator.service');

describe('hcCalculatorService service', function (){
	var gso;
	var DS;
	var ctrl;
	var deferred;
	beforeEach(function() {
		var moduleName = 'app.main.benefits.fsa-calculator.hc-calculator';

		var mockgsoService = function(){
			return { }
		};
		var mockDSService = function() {
			return {
				defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			};
		}

		angular
			.module(moduleName, [])
			.service('gso',mockgsoService)
			.service('DS',mockDSService)
			.service('tnHcCalculator', tnHcCalculator);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function(_DS_,_gso_,$q){

	 DS=_DS_;
	 gso = _gso_;
	 deferred=$q.defer();

	 var locals = {
		 gso:gso,
		 DS:DS,

	 };
		DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);
	 //ctrl = $componentController('tnDcCalculator', locals ,null);
	 }));

	it('calculateSuggestedContribution function test1 expenses lessthan min contribution ', inject(function (tnHcCalculator) {
		//DcCalculatorService.calculateSuggestedContribution();

		tnHcCalculator.calculateSuggestedContribution(10,200,5000);
	}));
	it('calculateSuggestedContribution function test1 expenses greater than  max contribution ', inject(function (tnHcCalculator) {
		//DcCalculatorService.calculateSuggestedContribution();
		tnHcCalculator.calculateSuggestedContribution(100000 , 200 , 50000);
	}));

	it('should calculate finacial savings',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFicaSavings(10000);
	}));
	it('should calculate finacial savings greater than socialsecurity amount',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFicaSavings(100000);
	}));

	it('should calculate federal tax savings ',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFederalTaxSavings(0,10000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax ',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFederalTaxSavings(0,100000,0);
	}));

	it('should calculate federal tax savings against tax 2',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFederalTaxSavings(1,10000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax against tax 2',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFederalTaxSavings(1,100000,0);
	}));

	it('should calculate federal tax savings against tax 3',inject(function(tnHcCalculator) {
			tnHcCalculator.calculateFederalTaxSavings(2,20000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax against tax 3',inject(function(tnHcCalculator) {
			tnHcCalculator.calculateFederalTaxSavings(2,200000,0);
	}));

	it('should calculate federal tax savings against tax 4',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFederalTaxSavings(3,40000,0);
	}));
	it('should calculate federal tax savings if annual income greater than tax against tax 4',inject(function(tnHcCalculator) {
		tnHcCalculator.calculateFederalTaxSavings(3,400000,0);
	}));

});

