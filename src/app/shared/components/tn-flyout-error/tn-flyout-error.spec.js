'use strict';

var angular = require('angular');
require('angular-mocks');

var tnFlyoutError = require('./tn-flyout-error.component');

describe('tn-flyout-error component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-flyout-error';

		angular
			.module(moduleName, [])
			.component('tnFlyoutError',tnFlyoutError);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController) {
		var locals;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
		};

		// Initialize Component Controller
		ctrl = $componentController('tnFlyoutError', locals, null);
	}));
	it('should initilize the controller',function() {
		expect(true).toBe(true);
	});

});
