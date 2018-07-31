'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEditProfilePersonalInfo = require('./tn-edit-profile-personal-info.component');

describe('tn-edit-profile-personal-info component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {
		var moduleName = 'trinet.shared.components.tn-edit-profile-personal-info';

		angular
			.module(moduleName, [])
			.component('tnEditProfilePersonalInfo', tnEditProfilePersonalInfo);

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
		ctrl = $componentController('tnEditProfilePersonalInfo', locals, null);
	}));
	it('should initilize the component',function() {
		ctrl.$onInit();
	});


});

