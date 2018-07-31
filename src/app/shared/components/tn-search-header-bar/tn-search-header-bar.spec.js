'use strict';

var angular = require('angular');
require('angular-mocks');

var tnSearchHeaderBar = require('./tn-search-header-bar.component');

describe('tn-search-header-bar component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-search-header-bar';

		angular
			.module(moduleName, [])
			.component('tnSearchHeaderBar', tnSearchHeaderBar);

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
		ctrl = $componentController('tnSearchHeaderBar', locals, null);
	}));
	it('should initilize the controller',function() {
		expect(true).toBe(true);
	});

});


