
'use strict';

var angular = require('angular');
var moment=require('moment');
require('angular-mocks');

var passwordModal = require('./password-modal.component');

describe('password-modal component', function() {
	var $scope;
	var ctrl;
	var mockForm = { data: {} };
	var saveDeferred;

	var ctrl;

	beforeEach(function() {
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};

		var moduleName = 'trinet.main.settings.security-card';

		angular
			.module(moduleName, [])
			.component('passwordModal', passwordModal)
		    .service('moment', mockMomentService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($q,$rootScope, $componentController,_moment_) {
		var locals;
		$scope = $rootScope.$new();

		saveDeferred = $q.defer();
		/*momentService=moment();*/

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			moment:_moment_,
		};

		// Initialize Component Controller
		ctrl = $componentController('passwordModal', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.resolve= {
			"data":[
				{
					"message":"modal data message",
					"payload ": {
						"employeeId":'',
						"effectiveDate": moment().format('YYYY-MM-DD'),
						"currentPassword": '',
						"newPassword": ''
					}
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
		expect(ctrl.modalInstance.dismiss).toHaveBeenCalledWith(ctrl.data);

	});

	it('testing if case',function() {
		var form="formName";
		ctrl.onSave(form);
		ctrl.modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),

		};

		/*expect(ctrl.modalInstance.close).toHaveBeenCalledWith(ctrl.data);*/
	});



});
