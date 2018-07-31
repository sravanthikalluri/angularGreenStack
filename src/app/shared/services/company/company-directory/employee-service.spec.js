'use strict';

var angular = require('angular');
require('angular-mocks');

var employeeService = require('./employee-service');

describe('employeeService service', function() {

	var DS;
	var deferred;
	var $scope;

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

		var moduleName = 'trinet.shared.services.company.company-directory';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('employeeService', employeeService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_employeeService_,_DS_, $q,$rootScope) {
		employeeService = _employeeService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
