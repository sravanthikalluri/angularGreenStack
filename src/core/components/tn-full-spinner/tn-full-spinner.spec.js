'use strict';

var angular = require('angular');
require('angular-mocks');

var tnFullSpinner = require('./tn-full-spinner.component');

describe('tn-full-spinner component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-full-spinner',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnFullSpinner', tnFullSpinner);

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
		obj['ctrl'] = obj['$componentController']('tnFullSpinner', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {
	});



});

