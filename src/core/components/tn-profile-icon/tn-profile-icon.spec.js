'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProfileIcon = require('./tn-profile-icon.component');

describe('tn-profile-icon component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'trinet.core.components.tn-profile-icon',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('tnProfileIcon', tnProfileIcon);

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
		obj['ctrl'] = obj['$componentController']('tnProfileIcon', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function() {

		obj['ctrl'].clicked();
	});


});

