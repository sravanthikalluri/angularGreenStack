'use strict';

var angular = require('angular');


require('angular-mocks');

var CountriesService = require('./countries.service');

describe('CountriesService service', function() {

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

		var moduleName = 'trinet.shared.services.countries';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('CountriesService', CountriesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_CountriesService_,_DS_, $q,$rootScope) {
		CountriesService = _CountriesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
