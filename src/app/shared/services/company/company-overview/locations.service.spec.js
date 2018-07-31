'use strict';

var angular = require('angular');


require('angular-mocks');

var LocationsService = require('./locations.service');

describe('LocationsService service', function() {

	var DS;
	var deferred;
	var $scope;
	var companyUrlConfig={
		"resources":{
			"profile":{}
		}
	};

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


		var moduleName = 'trinet.shared.services.locations';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.constant('companyUrlConfig',companyUrlConfig)
			.service('LocationsService', LocationsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_LocationsService_,_DS_, $q,$rootScope,_companyUrlConfig_) {
		LocationsService = _LocationsService_;
		companyUrlConfig=_companyUrlConfig_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
