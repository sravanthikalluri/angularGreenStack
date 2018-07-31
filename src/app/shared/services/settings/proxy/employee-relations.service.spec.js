
'use strict';

var angular = require('angular');


require('angular-mocks');

var relationService= require('./employee-relations.service');

describe('employee-relations service', function() {

	var DS;
	var deferred;
	var $scope;
	var manageEmpUrlConfig;
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

		var mockmanageEmpUrlConfigConstant={
			resources:{
				address:{}
			}

		};
		var moduleName = 'trinet.shared.services.employee-relations';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('manageEmpUrlConfig', mockmanageEmpUrlConfigConstant)
			.service('relationService', relationService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_relationService_,_DS_, $q,$rootScope,_manageEmpUrlConfig_) {
		relationService=_relationService_;
		manageEmpUrlConfig=_manageEmpUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});








