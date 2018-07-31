'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployeeRoles = require('./employee.service');

describe('EmployeeRoles service', function() {

	var DS;
	var deferred;
	var $scope;
	var ctrl;
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


		var moduleName = 'trinet.shared.services.EmployeeRoles';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('EmployeeRoles', EmployeeRoles);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployeeRoles_,_DS_, $q,$rootScope) {
		EmployeeRoles= _EmployeeRoles_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
		/*ctrl.deserialize=function(resourceConfig,response){

		 };*/
	});

});




