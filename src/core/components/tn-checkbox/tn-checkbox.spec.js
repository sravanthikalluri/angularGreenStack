'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCheckbox = require('./tn-checkbox.component');

describe('tn-checkbox component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-checkbox',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnCheckbox', tnCheckbox);

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
		obj['ctrl'] = obj['$componentController']('tnCheckbox', obj.locals, null);
	}));

	it('update function ', function() {
		obj['ctrl'].onUpdate=function(){};
		obj['ctrl'].update();
	});


});

