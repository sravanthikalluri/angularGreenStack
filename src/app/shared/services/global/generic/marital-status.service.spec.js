'use strict';

var angular = require('angular');


require('angular-mocks');

var MaritalStatusService = require('./marital-status.service');

describe('MaritalStatusService service', function() {

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

		var moduleName = 'trinet.shared.services.marital-status';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('MaritalStatusService', MaritalStatusService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_MaritalStatusService_,_DS_, $q,$rootScope) {
		MaritalStatusService = _MaritalStatusService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
