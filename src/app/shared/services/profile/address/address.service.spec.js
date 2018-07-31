'use strict';

var angular = require('angular');


require('angular-mocks');

var Address = require('./address.service');

describe('Address service', function() {

	var DS;
	var deferred;
	var $scope;
	var ctrl;
var stringUtil;
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
		var mockstringUtilService=function() {
			return {
				/*defineResource: function () {},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}*/
			}
		};
		var mockprofileUrlConfigConstant={
			resources:{
				address:{}
			}

		};

		var moduleName = 'trinet.shared.services.Address';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('stringUtil',mockstringUtilService)
			.constant('profileUrlConfig',mockprofileUrlConfigConstant)
			.service('Address', Address);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Address_,_DS_, $q,$rootScope,_stringUtil_,_profileUrlConfig_) {
		Address = _Address_;
		$scope = $rootScope.$new();
		DS=_DS_;
		stringUtil=_stringUtil_;
		profileUrlConfig=_profileUrlConfig_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
	/*ctrl.deserialize=function(resourceConfig,response){

	};*/
	});

});
