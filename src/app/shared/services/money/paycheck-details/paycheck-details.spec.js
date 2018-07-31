'use strict';

var angular = require('angular');


require('angular-mocks');

var PaycheckDetails = require('./paycheck-details.service');

describe('PaycheckDetails service', function() {

	var DS;
	var deferred;
	var $scope;
	var moment;
	var Header;
	var Detail;
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
		var mockMomentService=function() {
			return function (){

			}
		};
		var mockDetailService=function() {
			return function (){

			}
		};
		var mockHeaderService=function() {
			return function (){

			}
		};
		var moduleName = 'trinet.shared.services.money.paycheck-details';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('moment',mockMomentService)
			.service('Header',mockHeaderService)
			.service('Detail',mockDetailService)
			.service('PaycheckDetails',PaycheckDetails);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PaycheckDetails_,_DS_,_moment_,_moneyUrlConfig_,_Header_,_Detail_, $q,$rootScope) {
		PaycheckDetails = _PaycheckDetails_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;
		moment=_moment_;
		Header=_Header_;
		Detail=_Detail_;

		deferred=$q.defer();

	}));
	it('should return a value',function() {
	});

});
