'use strict';

var angular = require('angular');

require('angular-mocks');

var authenticationService = require('./authentication.service');

describe('Authentication service', function() {
	var DS;
	var $scope;
	var DSHttpAdapter;
	var stringUtil;
	var UserServiceLocal;
	var $timeout;
	var AuthenticationService;
	var deferred;
	beforeEach(function() {
		var mockDSService = function() {
				return {
					bulkEjectAll : function () {
						return {}
					},
					ejectAll: function () {}
				}
			},
			$timeoutMockService = function () {

			},
			UserServiceLocalService = function () {

			},
			moduleName = 'trinet.shared.services.authorize';
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('DSHttpAdapter',mockDSService)
			.service('UserServiceLocal',UserServiceLocalService)
			.service('AuthenticationService', authenticationService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($q, _AuthenticationService_, _DS_, _DSHttpAdapter_, $rootScope, $timeout, _UserServiceLocal_) {
		DS = _DS_;
		$scope = $rootScope.$new();
		DSHttpAdapter = _DSHttpAdapter_;
		UserServiceLocal = _UserServiceLocal_;
		AuthenticationService = _AuthenticationService_;
		deferred = $q.defer();
		UserServiceLocal.fetchByEmployeeID = jasmine.createSpy().and.returnValue(deferred.promise);
		UserServiceLocal.fetchBySSN = jasmine.createSpy().and.returnValue(deferred.promise);
		UserServiceLocal.fetchByCustomID = jasmine.createSpy().and.returnValue(deferred.promise);
	}));

	it('performSignonWithEmployeeID function test ', inject(function ($timeout) {
		AuthenticationService.performSignonWithEmployeeID(121, 'sadf', function () {});
		$timeout.flush();

		expect(UserServiceLocal.fetchByEmployeeID).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	}));

	it('performSignonWithSSN function test ', inject(function ($timeout) {
		AuthenticationService.performSignonWithSSN(121, 'sadf', function () {});
		$timeout.flush();

		expect(UserServiceLocal.fetchBySSN).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	}));

	it('performSignonWithCustomID function test ', inject(function ($timeout) {
		AuthenticationService.performSignonWithCustomID(121, 'sadf', function () {});
		$timeout.flush();

		expect(UserServiceLocal.fetchByCustomID).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	}));
});
