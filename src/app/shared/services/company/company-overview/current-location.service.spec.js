'use strict';

var angular = require('angular');


require('angular-mocks');

var CurrentLocationService = require('./current-location.service');

describe('CurrentLocationService service', function() {

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

		var moduleName = 'trinet.shared.services.current-location';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CurrentLocationService', CurrentLocationService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CurrentLocationService_,_DS_, $q,$rootScope) {
		CurrentLocationService = _CurrentLocationService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
