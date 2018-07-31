'use strict';

var angular = require('angular');


require('angular-mocks');

var department = require('./department.service');

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


		var moduleName = 'trinet.shared.department';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('department', department);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_department_,_DS_, $q,$rootScope) {
		department= _department_;
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


