'use strict';

var angular = require('angular');
require('angular-mocks');

var tnToggle = require('./tn-toggle.component');

describe('tn-toggle component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-toggle',
		locals: {},
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnToggle', tnToggle);

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
		obj['ctrl'] = obj['$componentController']('tnToggle', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].onToggle=function(){}
		obj['ctrl'].onToggleChange();
	});

});

