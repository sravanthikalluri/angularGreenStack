'use strict';

var angular = require('angular');
require('angular-mocks');

var timeOffTable = require('./time-off-table.component');

describe('timeOffTable component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		moduleName: 'app.main.dashboard.time-off-card.time-off-table',
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.component('timeOffTable', timeOffTable);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['deferred'] = $q.defer();
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
		};
		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('profile', obj.locals, null);
	}));
});

