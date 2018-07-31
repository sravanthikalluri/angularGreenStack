'use strict';

var angular = require('angular');
require('angular-mocks');

var tnSpinner = require('./tn-spinner.component');

describe('tn-spinner component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-spinner',
		locals: {},
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnSpinner', tnSpinner);

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
		obj['ctrl'] = obj['$componentController']('tnSpinner', obj.locals, {
			isShow : true,
			timeoutDuration : ''
		});

	}));

	it('ctrl variables should be initialized ', function() {
		obj['ctrl'].$onInit();
	});

	it('$onChanges function ', function() {

		obj['ctrl'].$onChanges();
	});
	it('should test timeout function', inject(function( $timeout ) {
		$timeout.flush();
	}));

});

