'use strict';

var angular = require('angular');


require('angular-mocks');

var AddressTypesService = require('./address-types.service');

describe('AddressTypesService service', function() {

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

		var moduleName = 'trinet.shared.services.address-types';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('AddressTypesService', AddressTypesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_AddressTypesService_,_DS_, $q,$rootScope) {
		AddressTypesService = _AddressTypesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
