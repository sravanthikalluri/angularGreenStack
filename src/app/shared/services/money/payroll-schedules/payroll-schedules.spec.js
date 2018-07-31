'use strict';

var angular = require('angular');


require('angular-mocks');

var PayrollSchedules = require('./payroll-schedules.service');

describe('PayrollSchedules service', function() {

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
		var moduleName = 'trinet.shared.services.payroll-schedules';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('PayrollSchedules', PayrollSchedules);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PayrollSchedules_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		PayrollSchedules = _PayrollSchedules_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();


	}));
	it('should return a value',function() {

	});

});
