'use strict';

var angular = require('angular');
var moment = require('moment');

require('angular-mocks');

var tnSecondaryContainer = require('./tn-secondary-container.component');

describe('tn-secondary-container component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-secondary-container';

		angular
			.module(moduleName, [])
			.component('tnSecondaryContainer',tnSecondaryContainer);

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
		ctrl = $componentController('tnSecondaryContainer', locals, null);
	}));
	it('should initailize the controller',function() {
		expect(true).toBe(true);
	});

});

