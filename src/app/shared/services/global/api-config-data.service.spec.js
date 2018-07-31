'use strict';

var angular = require('angular');


require('angular-mocks');

var apiConfigDataService = require('./api-config-data.service');

describe('apiConfigDataService service', function() {

	var genericService;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mockgenericService=function() {
			return {
				/*defineResource: function () {},
				 find: function () {
				 return {
				 data: {
				 data: {}
				 }
				 }
				 }*/
			}
		};

		var moduleName = 'trinet.shared.services.api-config-data';

		angular
			.module(moduleName, [])
			.service('genericService',mockgenericService)
			.service('apiConfigDataService', apiConfigDataService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_apiConfigDataService_,_genericService_, $q,$rootScope) {
		apiConfigDataService = _apiConfigDataService_;
		$scope = $rootScope.$new();
		genericService=_genericService_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {
/*
		execAll();
*/
	});

});
