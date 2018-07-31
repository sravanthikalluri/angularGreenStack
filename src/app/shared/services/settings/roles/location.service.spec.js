'use strict';

var angular = require('angular');


require('angular-mocks');

var companyLocation = require('./location.service');

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


		var moduleName = 'trinet.shared.services.location';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)

			.service('companyLocation', companyLocation);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_companyLocation_,_DS_, $q,$rootScope) {
		companyLocation= _companyLocation_;
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


