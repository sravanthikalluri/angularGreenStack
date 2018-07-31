'use strict';

var angular = require('angular');


require('angular-mocks');

var GendersService = require('./genders.service');

describe('GendersService service', function() {

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

		var moduleName = 'trinet.shared.services.genders';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('GendersService', GendersService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_GendersService_,_DS_, $q,$rootScope) {
		GendersService = _GendersService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
