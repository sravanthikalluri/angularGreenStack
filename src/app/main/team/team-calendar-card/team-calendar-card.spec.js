'use strict';

var angular = require('angular');
require('angular-mocks');

var teamCalendarCard = require('./team-calendar-card.component');

describe('team-calendar-card component', function() {
	var obj = {
		'ctrl': 'ctrl',
		'$scope': '$scope',
		moduleName : 'app.main.team.team-calendar-card',
	}
	beforeEach(function() {
	 angular
	 .module(obj.moduleName, [])
	 .component('teamCalendarCard', teamCalendarCard);

	 angular.mock.module(obj.moduleName);
	 });

	beforeEach(inject(function($q, $rootScope, $componentController) {


		obj['$scope'] = $rootScope.$new();

		obj['ctrl'] = $componentController('teamCalendarCard',  null);
	}));

	it('shoud not cause unit test error', angular.mock.inject(function () {
		expect(true).toBe(true);
	}));


});
