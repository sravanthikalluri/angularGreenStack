'use strict';

var angular = require('angular');


require('angular-mocks');

var PayrollSchedule = require('./payroll-schedule.service');

describe('PayrollSchedule service', function() {

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
		var moduleName = 'trinet.shared.services.payroll-schedule';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('PayrollSchedule', PayrollSchedule);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PayrollSchedule_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		PayrollSchedule = _PayrollSchedule_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();


	}));
	it('should return a value',function() {

	});

});
