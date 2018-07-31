
'use strict';

var angular = require('angular');
require('angular-mocks');

var personalInfo= require('./personal-info.service');

describe('personal Info service', function() {

	var DS;
	var deferred;
	var $scope;
	var profileUrlConfig;
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

		var mockprofileUrlConfig= function () {
			return {
				resources :
					{
						personalInfo : ''
					}
			};
		};

		var moduleName = 'trinet.shared.services.personal-info';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('profileUrlConfig',mockprofileUrlConfig)
			.service('personalInfo', personalInfo);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function (_personalInfo_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		personalInfo = _personalInfo_;
		profileUrlConfig=_profileUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});


