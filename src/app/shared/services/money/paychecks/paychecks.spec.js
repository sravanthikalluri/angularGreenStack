'use strict';

var angular = require('angular');


require('angular-mocks');

var Paychecks = require('./paychecks.service');

describe('Paychecks service', function() {

	var DS;
	var deferred;
	var $scope;
	var moment;
	var CheckSummaries;
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
		var CheckSummariesService=function() {
			return function (){

			}
		};
		var mockMomentService=function() {
			return function (){

			}
		};
		var moduleName = 'trinet.shared.services.money.paychecks.paychecks';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('moment',mockMomentService)
			.service('CheckSummaries',CheckSummariesService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('Paychecks',Paychecks);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Paychecks_,_DS_,_moment_,CheckSummaries, $q,$rootScope,_moneyUrlConfig_) {
		Paychecks = _Paychecks_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;
		CheckSummaries=CheckSummaries;
		moment=_moment_;
		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
