
'use strict';

var angular = require('angular');


require('angular-mocks');

var EmployeeDirectory= require('./employee-directory.service');

describe('employee-directory service', function() {

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


		var moduleName = 'trinet.shared.services.employee-directory';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('EmployeeDirectory', EmployeeDirectory);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EmployeeDirectory_,$q,$rootScope,_DS_) {
		EmployeeDirectory=_EmployeeDirectory_;

		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});








