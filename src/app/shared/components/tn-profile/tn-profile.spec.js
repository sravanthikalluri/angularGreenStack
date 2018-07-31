'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProfile = require('./tn-profile.component');

describe('tn-profile component ', function () {
	var mockForm = { data: {} };
	var $scope;
	var ProfileDataService;
	var saveDeferred;
	var gso;
	var ctrl;

	beforeEach(function () {
		var mockProfileDataService = function () {
			return {};
		};
		var gsoMockService = function () {
			return {
				getAppConfig: function () {
					return {};
				}
			}
		};
		var moduleName = 'trinet.shared.components.tn-profile';
		angular
			.module(moduleName, [])
			.service('ProfileDataService', mockProfileDataService)
			.service('gso', gsoMockService)
			.component('tnProfile', tnProfile);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($q, $rootScope, $componentController, _ProfileDataService_, _gso_) {
		var locals;
		$scope = $rootScope.$new();
		ProfileDataService = _ProfileDataService_;
		gso = _gso_;

		saveDeferred = $q.defer();
		ProfileDataService.fetch = jasmine.createSpy().and.returnValue(saveDeferred.promise);

		locals = {
			$scope: $scope,
			ProfileDataService: ProfileDataService
		};

		ctrl = $componentController('tnProfile', locals, null);
	}));

	it('Should execute onInit and initializes the success data ', function () {
		var mockResult = {};
		// Mock ctrl.data
		ctrl.data = mockForm;
		$scope.$digest();

		ctrl.$onInit();
		expect(ProfileDataService.fetch).toHaveBeenCalled();

		saveDeferred.resolve(mockResult);
		$scope.$digest();
	});

	it('Should execute onInit and initializes the error data ', function () {
		var mockResult = {};
		// Mock ctrl.data
		ctrl.data = mockForm;
		$scope.$digest();

		ctrl.$onInit();
		expect(ProfileDataService.fetch).toHaveBeenCalled();

		saveDeferred.reject(mockResult);
		$scope.$digest();
	})
});
