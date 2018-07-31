'use strict';

var angular = require('angular');


require('angular-mocks');

var AccessTypesService = require('./access-types.service');

describe('AccessTypesService service', function() {

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

		var moduleName = 'trinet.shared.services.access-types';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('AccessTypesService', AccessTypesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_AccessTypesService_,_DS_, $q,$rootScope) {
		AccessTypesService = _AccessTypesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
