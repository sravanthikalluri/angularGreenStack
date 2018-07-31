'use strict';

var angular = require('angular');
require('angular-mocks');

var secretQuestionModal = require('./secret-question-modal.component');

describe('secret-question-modal component', function() {
	var $scope;
	var ctrl;
	var mockForm = { data: {} };

	/*ctrl.data = {
	 name : '',
	 method : "PUT",
	 payload: {
	 employeeId: '',
	 question: '',
	 answer: ''

	 }
	 };*/
	beforeEach(function() {

		var moduleName = 'trinet.main.settings.mfa-card';

		angular
			.module(moduleName, [])
			.component('secretQuestionModal', secretQuestionModal);

	/*	leaveTypeService.findAll = jasmine.createSpy().and.returnValue(deferred.promise);*/

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
		ctrl = $componentController('secretQuestionModal', locals, {
			resolve : {
				data : {
					method : "PUT"
				}
			}
		});
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

		expect(ctrl.modalInstance.dismiss).toHaveBeenCalledWith(ctrl.html);

	});


	it('testing if case',function() {
		var form="formName";

		ctrl.data= {
			"payload":
				{
					"message":"modal data message",
					"question":{
						"question":"question data"
					},
				}


		};
		ctrl.onSave("formName");
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),

		};
	});


});
