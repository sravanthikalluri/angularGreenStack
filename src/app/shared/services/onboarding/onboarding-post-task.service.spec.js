
'use strict';

var angular = require('angular');
require('angular-mocks');

var onboardingPostTask= require('./onboarding-post-task.service');

describe('onboarding-post-task service', function() {

	var DS;
	var deferred;
	var $scope;
	var newhireUrlConfig;
	var stringUtil;

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
						newhireTask:'',
						completionDate:''
					}
			};
		};
		 var mockstringUtil= function () {
			 return {};
		 };

		var moduleName = 'trinet.shared.services.onboarding';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('newhireUrlConfig',mocknewhireUrlConfig)
			.service('stringUtil',mockstringUtil)
			.service('onboardingPostTask', onboardingPostTask);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_onboardingPostTask_,_DS_, $q,$rootScope,_newhireUrlConfig_,_stringUtil_) {
		onboardingPostTask = _onboardingPostTask_;
		newhireUrlConfig=_newhireUrlConfig_;
		stringUtil=_stringUtil_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


