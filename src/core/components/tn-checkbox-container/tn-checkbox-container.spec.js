'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCheckboxContainer = require('./tn-checkbox-container.component');

describe('tn-checkbox-container component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-checkbox-container',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnCheckboxContainer', tnCheckboxContainer);

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
		obj['ctrl'] = obj['$componentController']('tnCheckboxContainer', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {

	});


});

