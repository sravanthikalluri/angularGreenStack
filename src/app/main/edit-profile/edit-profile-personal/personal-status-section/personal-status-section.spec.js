/**
 * Created by Sravani on 2/6/2017.
 */
'use strict';

var angular = require('angular');
require('angular-mocks');

var personalStatusSection = require('./personal-status-section.component');

describe('personal status section component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		'mockData': {
		},
		moduleName: 'app.main.edit-profile.edit-profile-personal.personal-status-section',
		mockDSService: function () {
			return {}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('personalStatusSection', personalStatusSection);

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
		obj['ctrl'] = obj['$componentController']('personalStatusSection', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].$onInit();
		obj['ctrl'].onUpdate = function () {};
		obj['ctrl'].update('foo','bar');

	});
});


