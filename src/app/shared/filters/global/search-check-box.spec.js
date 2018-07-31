'use strict';

var angular = require('angular');
require('angular-mocks');

var searchCheckBoxFilter = require('./search-check-box.filter');

describe('contentUrl filter', function() {
	beforeEach(function() {

		var moduleName = 'trinet.shared.filters.global';

		angular
			.module(moduleName, [])
			.filter('searchCheckBoxFilter', searchCheckBoxFilter);

		angular.mock.module(moduleName);
	});

	it('should return checked objects', angular.mock.inject(function($filter) {
		var inputArray = [{
						  "alerts": false,
						  "dashboards": true,
						  "employeeId": "1430788",
						  "employeeName": "Aamot,Camila ghj",
						  "managerName": "Abdel,Adelia ",
						  "position": "Sales",
						  "reportuser": false,
						  "standardReports": false
					  },
					  {
						  "alerts": false,
						  "dashboards": true,
						  "employeeId": "1430781",
						  "employeeName": "Aasen,Bree te",
						  "managerName": "Ambrogi,Carolyn ",
						  "position": "Marketing",
						  "reportuser": false,
						  "standardReports": true
					  }];
		var selection = ['Sales'];
		expect($filter('searchCheckBoxFilter')(inputArray,selection)).toEqual([{
																			  "alerts": false,
																			  "dashboards": true,
																			  "employeeId": "1430788",
																			  "employeeName": "Aamot,Camila ghj",
																			  "managerName": "Abdel,Adelia ",
																			  "position": "Sales",
																			  "reportuser": false,
																			  "standardReports": false
																		  }]);
	}));

	it('should return input array', angular.mock.inject(function($filter) {
		var inputArray = [{
						  "alerts": false,
						  "dashboards": true,
						  "employeeId": "1430788",
						  "employeeName": "Aamot,Camila ghj",
						  "managerName": "Abdel,Adelia ",
						  "position": "Sales",
						  "reportuser": false,
						  "standardReports": false
					  },
					  {
						  "alerts": false,
						  "dashboards": true,
						  "employeeId": "1430781",
						  "employeeName": "Aasen,Bree te",
						  "managerName": "Ambrogi,Carolyn ",
						  "position": "Marketing",
						  "reportuser": false,
						  "standardReports": true
					  }];
		var selection = [];
		expect($filter('searchCheckBoxFilter')(inputArray,selection)).toEqual(inputArray);
	}));


});
