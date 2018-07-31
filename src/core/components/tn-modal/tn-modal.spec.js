'use strict';

var angular = require('angular');
require('angular-mocks');

var tnModal = require('./tn-modal.component');

describe('tn-modal component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-modal',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnModal', tnModal);

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
		obj['ctrl'] = obj['$componentController']('tnModal', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {

		obj['ctrl'].$onInit();
	});
	it('close function ', function() {

		obj['ctrl'].onClose();
	});


});

