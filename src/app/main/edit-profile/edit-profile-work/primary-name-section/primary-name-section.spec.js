'use strict';

var angular = require('angular');
require('angular-mocks');

var primaryNameSection = require('./primary-name-section.component');

describe('primary-name-section component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.edit-profile.edit-profile-work.primary-name-section',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('primaryNameSection', primaryNameSection);

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
		obj['ctrl'] = obj['$componentController']('primaryNameSection', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {

		obj['ctrl'].$onInit();
	});
	it('update function', function () {
		obj['ctrl'].onUpdate = function () {};
		obj['ctrl'].update('foo','bar');
	});
});

