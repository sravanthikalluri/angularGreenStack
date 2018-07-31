'use strict';

var angular = require('angular');
require('angular-mocks');

var tnRepeat = require('./tn-repeat.component');

describe('tn-repeat component', function() {
	var $scope;
	var ctrl;


	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-repeat';

		angular
			.module(moduleName, [])
			.component('tnRepeat', tnRepeat);

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
		ctrl = $componentController('tnRepeat', locals, null);
	}));
	it('should initilize the component',function() {
		expect(true).toBe(true);
	});
});

