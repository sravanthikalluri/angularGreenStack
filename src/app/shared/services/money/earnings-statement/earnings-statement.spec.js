'use strict';

var angular = require('angular');


require('angular-mocks');

var EarningsStatement = require('./earnings-statement.service');

describe('EarningsStatement service', function() {

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
		var moduleName = 'trinet.shared.services.earnings-statement';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('EarningsStatement', EarningsStatement);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EarningsStatement_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		EarningsStatement = _EarningsStatement_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
