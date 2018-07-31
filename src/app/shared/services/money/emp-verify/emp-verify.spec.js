'use strict';

var angular = require('angular');


require('angular-mocks');

var empVerifyService = require('./emp-verify.service');

describe('empVerifyService service', function() {

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
		var moduleName = 'trinet.shared.services.emp-verify';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('moneyUrlConfig',moneyUrlConfig)
			.service('empVerifyService', empVerifyService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_empVerifyService_,_DS_, $q,$rootScope,_moneyUrlConfig_) {
		empVerifyService = _empVerifyService_;
		$scope = $rootScope.$new();
		DS=_DS_;
		moneyUrlConfig=_moneyUrlConfig_;

		deferred=$q.defer();


	}));
	it('should return a value',function() {

	});

});
