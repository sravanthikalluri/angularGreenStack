'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEditProfilePersonalData = require('./tn-edit-profile-personal-data.component');

describe('tn-edit-profile-personal-data component', function() {
	var $scope;
	var ctrl;
	var DS;

	beforeEach(function() {
		var mockDSService=function() {

		}

		var moduleName = 'trinet.shared.components.tn-edit-profile-personal-data';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.component('tnEditProfilePersonalData', tnEditProfilePersonalData);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_DS_) {
		var locals;
		$scope = $rootScope.$new();
		DS=_DS_;

		// Set up our dependencies to be injected into $componentController

		locals = {
			$scope: $scope,
			DS:DS
		};

		// Initialize Component Controller
		ctrl = $componentController('tnEditProfilePersonalData', locals, null);
	}));
	it('should initilize the component',function() {
		ctrl.$onInit();

	});


});

