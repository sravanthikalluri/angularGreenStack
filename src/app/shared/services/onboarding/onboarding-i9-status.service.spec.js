
'use strict';

var angular = require('angular');
require('angular-mocks');

var onboardingI9Status= require('./onboarding-i9-status.service');

describe('onboarding-i9-status service', function() {

	var DS;
	var deferred;
	var $scope;
	var homeUrlConfig;

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

		var mockhomeUrlConfig= function () {
			return {
				resources :
					{
						home : '',
						i9Status:''
					}
			};
		};

		var moduleName = 'trinet.shared.services.onboarding';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('homeUrlConfig',mockhomeUrlConfig)
			.service('onboardingI9Status', onboardingI9Status);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_onboardingI9Status_,_DS_, $q,$rootScope,_homeUrlConfig_) {
		onboardingI9Status = _onboardingI9Status_;
		homeUrlConfig=_homeUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


