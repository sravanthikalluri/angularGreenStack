'use strict';

var angular = require('angular');
require('angular-mocks');

var customIdModal = require('./custom-id-modal.component');

describe('custom-id-modal component', function() {
	var $scope;
	var ctrl;
	var modalInstance;
	var saveDeferred;

	beforeEach(function() {

		var moduleName = 'trinet.main.settings.security-card';

		angular
			.module(moduleName, [])
			.component('customIdModal', customIdModal);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();
	/*	onSave = jasmine.createSpy().and.returnValue(saveDeferred.promise);*/
		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('customIdModal', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.resolve= {
			"data":[
				{
					"message":"modal data message"
				}
			]
		};
		ctrl.$onInit();
	});


	it('should close the modal when called', function () {
		ctrl.modalInstance = {
			dismiss: jasmine.createSpy('modalInstance.dismiss')
		};
		ctrl.onCancel();

	/*	expect(ctrl.modalInstance.dismiss).toHaveBeenCalledWith(ctrl.data);*/

	});
	it('testing if case',function() {
		var form="formName";
		ctrl.onSave("formName");
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),

		};
		/*	expect(ctrl.modalInstance.close).toHaveBeenCalledWith(ctrl.data);*/
	});


	it('should show testing ',function() {
		var form="value";
		ctrl.showErrorFlyout(form);

		/*	expect(ctrl.modalInstance.close).toHaveBeenCalledWith(ctrl.data);*/
	});





});
