'use strict';

var angular = require('angular');


require('angular-mocks');

var PaycheckCity = require('./paycheck-city.service');

describe('PaycheckCity service', function() {

	var DS;
	var deferred;
	var $scope;
	var moneyUrlConfig={
		resources:{
			directDeposit:{}
		}
	};

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
		var moduleName = 'trinet.shared.services.money.paychecks.paycheck-city';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('PaycheckCity',PaycheckCity);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PaycheckCity_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		PaycheckCity = _PaycheckCity_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
