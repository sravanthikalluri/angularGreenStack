'use strict';

var angular = require('angular');


require('angular-mocks');

var StatesService = require('./states.service');

describe('StatesService service', function() {

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

		var moduleName = 'trinet.shared.services.states';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('StatesService', StatesService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_StatesService_,_DS_, $q,$rootScope) {
		StatesService = _StatesService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
