'use strict';

var angular = require('angular');


require('angular-mocks');

var EthnicityService = require('./ethnicity.service');

describe('EthnicityService service', function() {

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

		var moduleName = 'trinet.shared.services.ethnicity';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('EthnicityService', EthnicityService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_EthnicityService_,_DS_, $q,$rootScope) {
		EthnicityService = _EthnicityService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
