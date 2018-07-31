'use strict';

var angular = require('angular');


require('angular-mocks');

var Employees = require('./employees.service');

describe('Address service', function() {

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


		var moduleName = 'trinet.shared.services.employees';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('Employees', Employees);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Employees_,_DS_, $q,$rootScope) {
		Employees= _Employees_;
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


