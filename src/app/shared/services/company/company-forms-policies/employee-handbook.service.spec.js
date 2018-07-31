'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployeeHandbookService = require('./employee-handbook.service');

describe('EmployeeHandbookService service', function() {

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

		var moduleName = 'trinet.shared.services.employee-handbook';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('EmployeeHandbookService', EmployeeHandbookService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployeeHandbookService_,_DS_, $q,$rootScope) {
		EmployeeHandbookService = _EmployeeHandbookService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
