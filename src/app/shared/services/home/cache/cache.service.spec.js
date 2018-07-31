'use strict';

var angular = require('angular');


require('angular-mocks');

var cache = require('./cache.service');

describe('cache service', function() {

	var DS;
	var deferred;
	var $scope;

	beforeEach(function() {
		var mockDSService=function() {
			return {
				defineResource: function () {
					/*deserialize = function (resourceConfig, response) {
						 return {};
					}*/
				},
				find: function () {
					return {
						data: {
							data: {}
						}
					}
				}
			}
		};

		var moduleName = 'trinet.shared.services.cache';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('cache', cache);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_cache_,_DS_, $q,$rootScope) {
		cache = _cache_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
