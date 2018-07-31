'use strict';

var angular = require('angular');
require('angular-mocks');

var tnDatepickerModal = require('./tn-datepicker-modal.component');

describe('tn-datepicker-modal component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-datepicker.tn-datepicker-modal',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnDatepickerModal', tnDatepickerModal);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('tnDatepickerModal', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {

		obj['ctrl'].$onInit();
	});
	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].modalHeader = "dfsd";
		obj['ctrl'].$onInit();
	});
	it('close function ', function() {
		var ele = '<button id="viewPayrollScheduleBtn">Click</button>';

		obj['ctrl'].onClose();
	});
	it('should moveFocusToClose ', function() {
		var ele = '<button id="viewPayrollScheduleBtn">Click</button>';

		obj['ctrl'].moveFocusToClose();
	});


});

