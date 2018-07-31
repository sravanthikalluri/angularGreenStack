'use strict';
var angular = require('angular');
require('angular-mocks');
var genericService = require('./generic.service');

describe('genericService service', function() {

	var DS;
	var deferred;
	var $scope;
	var gso;
	beforeEach(function() {
		var mockDSService=function() {
			return {
			}
		};
		var mockGsoService=function() {
			return {};
		}

		var moduleName = 'trinet.shared.services.generic';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('gso',mockGsoService)
			.service('genericService', genericService);

		angular.mock.module(moduleName);
	});
	beforeEach(inject(function (_genericService_,_DS_, $q,$rootScope,_gso_) {
		genericService = _genericService_;
		gso=_gso_;
		$scope = $rootScope.$new();
		DS=_DS_;

		deferred=$q.defer();
		//DS.defineResource=jasmine.createSpy().and.returnValue(deferred.promise);

	}));
	it('should return a value',function() {

	});

});
