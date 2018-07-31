'use strict';

var angular = require('angular');


require('angular-mocks');

var RelationShipsService = require('./relation-ships.service');

describe('RelationShipsService service', function() {

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

		var moduleName = 'trinet.shared.services.relation-ships';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('RelationShipsService', RelationShipsService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_RelationShipsService_,_DS_, $q,$rootScope) {
		RelationShipsService = _RelationShipsService_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
