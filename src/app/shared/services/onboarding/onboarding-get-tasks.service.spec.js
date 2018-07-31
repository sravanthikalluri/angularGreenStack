
'use strict';

var angular = require('angular');
require('angular-mocks');

var onboardingGetTasks= require('./onboarding-get-tasks.service');

describe('onboarding-get-tasks service', function() {

	var DS;
	var deferred;
	var $scope;
	var newhireUrlConfig;

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

		var mocknewhireUrlConfig= function () {
			return {
				resources :
					{
						onboard : '',
						newhireTask:''
					}
			};
		};

		var moduleName = 'trinet.shared.services.onboarding';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('newhireUrlConfig',mocknewhireUrlConfig)
			.service('onboardingGetTasks', onboardingGetTasks);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_onboardingGetTasks_,_DS_, $q,$rootScope,_newhireUrlConfig_) {
		onboardingGetTasks = _onboardingGetTasks_;
		newhireUrlConfig=_newhireUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


