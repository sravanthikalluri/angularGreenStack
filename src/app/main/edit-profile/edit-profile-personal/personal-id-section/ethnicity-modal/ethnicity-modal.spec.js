/**
 * Created by Sravani on 2/3/2017.
 */
/**
 * Created by Sravani on 2/1/2017.
 */

'use strict';

var angular = require('angular');
require('angular-mocks');

var ethnicityModal = require('./ethnicity-modal.component');

describe('ethnicity-modal component', function() {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',


		moduleName:  'app.main.edit-profile.edit-profile-personal.personal-id-section.ethnicity-modal',
		locals: {}
	};



	beforeEach(function() {



		angular
			.module(obj.moduleName, [])
			.component('ethnicityModal',ethnicityModal);
		angular.mock.module(obj.moduleName);
	});
	beforeEach(inject(function($rootScope, $componentController) {

		obj['$scope'] = $rootScope.$new();
obj['$componentController']= $componentController;

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope:obj['$scope'],


		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('ethnicityModal',obj.locals, null);
	}));
	it('should initailize the controller',function() {
		obj['ctrl'].$onInit();

	});








	it('should close the modal when called', function () {
		obj['ctrl'].modalInstance = {
			close: jasmine.createSpy('modalInstance.close'),
		/*	dismiss: jasmine.createSpy('modalInstance.dismiss')*/
		};
		obj['ctrl'].onSave();
	/*	expect(ctrl.modalInstance.dismiss).toHaveBeenCalledWith('cancel');*/
		expect(obj['ctrl'].modalInstance.close).toHaveBeenCalledWith();
	});

	//




it('should dismiss the modal when called', function () {
	obj['ctrl'].modalInstance = {
		/*close: jasmine.createSpy('modalInstance.close'),*/
		dismiss: jasmine.createSpy('modalInstance.dismiss')
	};
	obj['ctrl'].onCancel();
		expect(obj['ctrl'].modalInstance.dismiss).toHaveBeenCalledWith();
/*	expect(ctrl.modalInstance.close).toHaveBeenCalledWith();*/
});

//
});
//

