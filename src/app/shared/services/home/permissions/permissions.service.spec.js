'use strict';

var angular = require('angular');


require('angular-mocks');

var PermissionsService = require('./permissions.service');

describe('PermissionsService service', function() {

	var DS;
	var deferred;
	var $scope;
	var homeUrlConfig={
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


		var moduleName = 'trinet.shared.services.permissions';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('homeUrlConfig',homeUrlConfig)
			.service('PermissionsService', PermissionsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_PermissionsService_,_DS_, $q,$rootScope,_homeUrlConfig_) {
		PermissionsService = _PermissionsService_;
		homeUrlConfig=_homeUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
