'use strict';

var angular = require('angular');
require('angular-mocks');

var tnHolidayCalendarTable = require('./holiday-calendar-table.component');

describe('tn-holiday-calendar-table component', function() {
	var $scope;
	var ctrl;

	beforeEach(function() {

		var moduleName = 'trinet.main.company.holiday-calendar.holiday-calendar-table';

		angular
			.module(moduleName, [])
			.component('tnHolidayCalendarTable', tnHolidayCalendarTable);

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
		ctrl = $componentController('tnHolidayCalendarTable', locals, null);
	}));
	it('should initilize the controller',function() {
		var chipStyle = {}
		ctrl.$onInit();
	});

});

