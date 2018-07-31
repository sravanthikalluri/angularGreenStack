'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployeeInfoService = require('./emp-info.service');

describe('EmployeeInfoService service', function() {

	var DS;
	var deferred;
	var $scope;
	var gso;
	var loginUrlConfig={
		"resources":{
			"profile":{}
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
		var mockGsoService=function() {
			return {
				getUtilService:function() {
					return  {
						getCookie:function() {
							return
						}
					}
				}
			}
		};

		var moduleName = 'trinet.shared.services.emp-info';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('loginUrlConfig',loginUrlConfig)
			.service('gso',mockGsoService)
			.service('EmployeeInfoService', EmployeeInfoService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployeeInfoService_,_DS_, $q,$rootScope,_loginUrlConfig_,_gso_) {
		EmployeeInfoService = _EmployeeInfoService_;
		loginUrlConfig=_loginUrlConfig_;
		gso=_gso_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		gso.getUtilService=jasmine.createSpy().and.returnValue(deferred.promise);
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
