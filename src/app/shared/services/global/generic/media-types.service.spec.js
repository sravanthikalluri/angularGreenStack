'use strict';

var angular = require('angular');


require('angular-mocks');

var MediaTypesService = require('./media-types.service');

describe('MediaTypesService service', function() {

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

		var moduleName = 'trinet.shared.services.media-types';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('MediaTypesService', MediaTypesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_MediaTypesService_,_DS_, $q,$rootScope) {
		MediaTypesService = _MediaTypesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
