'use strict';

var angular = require('angular');
require('angular-mocks');

var preferencesModal = require('./preferences-modal.component');

describe('preferences-modal component', function() {
	var $scope;
	var ctrl;
	var modalInstance;

	beforeEach(function() {

		var moduleName = 'trinet.main.settings.mfa-card';

		angular
			.module(moduleName, [])
			.component('preferencesModal', preferencesModal);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('preferencesModal', locals, null);
	}));
	it('should initilize the controller',function() {
		/*ctrl.$onInit();*/
	});

	it('should cancel the controller',function() {
		/*ctrl.onContinue();*/
	});
	it('should close the modal when called', function () {
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
		ctrl.onCancel();
		ctrl.onContinue();
		expect(ctrl.modalInstance.dismiss).toHaveBeenCalledWith(ctrl.html);
		expect(ctrl.modalInstance.close).toHaveBeenCalledWith(ctrl.html);
	});
});
