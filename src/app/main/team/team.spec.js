'use strict';

var angular = require('angular');
require('angular-mocks');

var team = require('./team.component');

describe('team component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'app.main.team',
	}
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.component('team', team);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('team',  null);
	}));

	it('shoud not cause unit test error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});
