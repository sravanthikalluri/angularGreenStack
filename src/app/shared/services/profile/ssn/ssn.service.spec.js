
'use strict';

var angular = require('angular');


require('angular-mocks');

var SSN= require('./ssn.service');

describe('SSN service', function() {

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

		var mockprofileUrlConfigConstant={
			resources:{
				address:{}
			}

		};

		var moduleName = 'trinet.shared.services.ssn';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('profileUrlConfig',mockprofileUrlConfigConstant)
			.service('SSN', SSN);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_SSN_,_DS_, $q,$rootScope,_profileUrlConfig_) {
		SSN = _SSN_;
		$scope = $rootScope.$new();
		DS=_DS_;
		profileUrlConfig=_profileUrlConfig_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});




