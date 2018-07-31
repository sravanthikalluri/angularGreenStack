'use strict';

var angular = require('angular');
require('angular-mocks');

var tnButton = require('./tn-button.component');

describe('tn button component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-button',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnButton', tnButton);

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
		obj['ctrl'] = obj['$componentController']('tnButton', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {

		/*obj['ctrl'].$onInit();*/
	});



});

