'use strict';

var angular = require('angular');
require('angular-mocks');

var preferredNameSection = require('./preferred-name-section.component');

describe('preferred-name-section component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName: 'app.main.edit-profile.edit-profile-work.preferred-name-section',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('preferredNameSection', preferredNameSection);

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
		obj['ctrl'] = obj['$componentController']('preferredNameSection', obj.locals, null);
		obj['ctrl'].data = {};
		obj['ctrl'].isPreferredPrimary = 'raj';
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].$onInit();
	});
	it('update function', function () {
		obj['ctrl'].onUpdate = function () {};
		obj['ctrl'].update('foo','bar');
	});
	it('get Primary Info function', function () {
		obj['ctrl'].getPrimaryInfo(true);
		//obj['ctrl'].updatePreferredSectionDOM();
	});
	it('get Primary Info function', function () {
		obj['ctrl'].getPrimaryInfo(false);
		//obj['ctrl'].updatePreferredSectionDOM();
	});


});

