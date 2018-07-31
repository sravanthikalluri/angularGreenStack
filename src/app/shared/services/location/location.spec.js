'use strict';

var angular = require('angular');


require('angular-mocks');

var Location = require('./location.service');

describe('Location service', function() {

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
		var moduleName = 'trinet.shared.services.time-off.location';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('Location', Location);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_Location_,_DS_, $q,$rootScope) {
		Location = _Location_;
		$scope = $rootScope.$new();
		DS=_DS_;
		deferred=$q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);


	}));
	it('should return a value',function() {
		var des = Location.init();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});

});
