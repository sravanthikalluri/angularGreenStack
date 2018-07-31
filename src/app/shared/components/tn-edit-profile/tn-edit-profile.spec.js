'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEditProfile = require('./tn-edit-profile.component');

describe('tn-edit-profile component', function() {
	var mockForm = { data: {} };
	var $scope;
	var ProfileDataService;
	var saveDeferred;
	var ctrl;

	beforeEach(function() {
		var mockProfileDataService = function() {
			return {};
		};

		var moduleName = 'trinet.shared.components.tn-edit-profile';

		angular
			.module(moduleName, [])
			.service('ProfileDataService', mockProfileDataService)
			.component('tnEditProfile', tnEditProfile);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController, _ProfileDataService_) {
		var locals;

		$scope = $rootScope.$new();
		ProfileDataService = _ProfileDataService_;

		// Stub the service functions
		saveDeferred = $q.defer();
		ProfileDataService.save = jasmine.createSpy().and.returnValue(saveDeferred.promise);
		ProfileDataService.savePersonalSection = jasmine.createSpy().and.returnValue(saveDeferred.promise);
		ProfileDataService.getForm = jasmine.createSpy().and.returnValue(mockForm);

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			ProfileDataService: ProfileDataService
		};

		// Initialize Component Controller
		ctrl = $componentController('tnEditProfile', locals, null);
	}));

	it('should be initialized with Profile Form data', function() {
		ctrl.$onInit();
		expect(ProfileDataService.getForm).toHaveBeenCalled();
		expect(ctrl.data).toEqual(mockForm);
	});

	it('should save the Profile form data and show the result', function() {
		var mockResult = {};
		var form = {
			$valid: true
		};
		// Mock ctrl.data
		ctrl.data = mockForm;
		$scope.$digest();

		// Call save and assert that ProfileDataService.save was called
		ctrl.save(form);
		expect(ProfileDataService.save).toHaveBeenCalledWith(mockForm);

		// ProfileData.save returns a promise.  Resolve the promise.  Calling $scope.$digest()
		// will trigger the digest cycle and allow code in the .then() method to execute
		saveDeferred.resolve(mockResult);
		$scope.$digest();

		// Assert the resolved value passed to the callback in the .then() method
		// expect(ctrl.data.successMessage).toEqual(mockResult);
	});

	it('should not save the Profile form data and show an error', function() {
		var mockError = {};
		var form = {
			$valid: true
		};
		ctrl.data = mockForm;
		$scope.$digest();
		ctrl.save(form);
		expect(ProfileDataService.save).toHaveBeenCalledWith(mockForm);

		// Reject the promise to simulate failure.
		saveDeferred.reject(mockError);
		$scope.$digest();
		// expect(ctrl.error).toEqual(mockError);
	});

	it('should not save the Profile form data and show an error', function() {
		var mockError = {};
		var form = {
			$valid: false
		};
		ctrl.data = mockForm;
		$scope.$digest();
		ctrl.save(form);
	});

	it('should get execute savePersonalSection function and show the result', function() {
		var mockResult = {};
		var form = {
			$valid: true
		};
		// Mock ctrl.data
		ctrl.data = mockForm;
		$scope.$digest();

		// Call save and assert that ProfileDataService.save was called
		ctrl.savePersonalSection(form);
		expect(ProfileDataService.savePersonalSection).toHaveBeenCalledWith(mockForm);

		// ProfileData.save returns a promise.  Resolve the promise.  Calling $scope.$digest()
		// will trigger the digest cycle and allow code in the .then() method to execute
		saveDeferred.resolve(mockResult);
		$scope.$digest();

		// Assert the resolved value passed to the callback in the .then() method
		// expect(ctrl.data.successMessage).toEqual(mockResult);
	});

	it('should not execute the savePersonalSection and show an error', function() {
		var mockError = {};
		var form = {
			$valid: false
		};
		ctrl.data = mockForm;
		$scope.$digest();
		ctrl.savePersonalSection(form);
	});
});
