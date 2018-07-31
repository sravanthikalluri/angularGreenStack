'use strict';

var angular = require('angular');


require('angular-mocks');

var DirectDeposit = require('./direct-deposit.service');

describe('DirectDeposit service', function() {

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
		var moduleName = 'trinet.shared.services.direct-deposit';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('DirectDeposit', DirectDeposit);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_DirectDeposit_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		DirectDeposit = _DirectDeposit_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {

	});

});
