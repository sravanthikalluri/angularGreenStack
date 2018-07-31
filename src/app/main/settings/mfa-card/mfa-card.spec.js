/*
'use strict';

var angular = require('angular');
require('angular-mocks');

var mfaCard = require('./mfa-card.component');

describe('mfa-card component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.main.settings.mfa-card';

		angular
			.module(moduleName, [])
			.component('mfaCard', mfaCard);

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
		ctrl = $componentController('mfaCard', locals, null);
	}));
	it('should initilize the controller',function() {
		ctrl.$onInit();
	});

});









*/
