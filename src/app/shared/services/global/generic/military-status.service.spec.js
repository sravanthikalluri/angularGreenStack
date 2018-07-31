'use strict';

var angular = require('angular');


require('angular-mocks');

var MilitaryStatusesService = require('./military-status.service');

describe('MilitaryStatusesService service', function() {

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

		var moduleName = 'trinet.shared.services.military-status';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('MilitaryStatusesService', MilitaryStatusesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_MilitaryStatusesService_,_DS_, $q,$rootScope) {
		MilitaryStatusesService = _MilitaryStatusesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
