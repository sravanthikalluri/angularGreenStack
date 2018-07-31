'use strict';

var angular = require('angular');
require('angular-mocks');

var personalInfoSelf = require('./personal-info-self.service');

describe('personal-info-self service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {
					/*deserialize = function (resourceConfig, response) {
						return {};
					}*/
				},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};

		var mockprofileUrlConfig= function(){
			return {
				resources :
					{
						personalInfo : ''
					}
			};
		};

		var moduleName = 'trinet.shared.services.profile.personal-info';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('profileUrlConfig',mockprofileUrlConfig)
			.service('personalInfoSelf', personalInfoSelf);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_personalInfoSelf_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		personalInfoSelf = _personalInfoSelf_;
		profileUrlConfig=_profileUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
