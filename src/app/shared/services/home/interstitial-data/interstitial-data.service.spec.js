'use strict';

var angular = require('angular');


require('angular-mocks');

var InterstitialDataService = require('./interstitial-data.service');

describe('InterstitialDataService service', function() {

	var DS;
	var deferred;
	var homeUrlConfig = {
		resources: {
			interstitial: ''
		}
	};
	var $scope;
	var profileUrlConfig={
		"resources":{
			"interstitial":{}
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


		var moduleName = 'trinet.shared.services.interstitial-data';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('homeUrlConfig',homeUrlConfig)
			.service('InterstitialDataService', InterstitialDataService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_InterstitialDataService_,_DS_, $q,$rootScope,_homeUrlConfig_) {
		InterstitialDataService = _InterstitialDataService_;
		homeUrlConfig=_homeUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
	}));
	it('should return a value',function() {

	});
});
