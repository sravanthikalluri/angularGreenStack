'use strict';

var angular = require('angular');


require('angular-mocks');

var retirementSavings = require('./retirement-savings.service');

describe('retirement-savings service', function() {

	var DS;
	var deferred;
	var $scope;
	var moneyUrlConfig;
	var gso;


	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};
		var mockmoneyUrlConfig= function () {
			return {
				resources :
					{
						retirementPlan : '',
						savingPlans:''
					}
			};
		};
		var mockgso = function () {
			return {};
		};

		var moduleName = 'trinet.shared.services.money.retirement-savings';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moneyUrlConfig',mockmoneyUrlConfig)
			.service('gso',mockgso)
			.service('retirementSavings', retirementSavings);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_retirementSavings_,_DS_, $q,$rootScope,_moneyUrlConfig_,_gso_) {
		retirementSavings = _retirementSavings_;
		$scope = $rootScope.$new();
		DS=_DS_;
		gso=_gso_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
