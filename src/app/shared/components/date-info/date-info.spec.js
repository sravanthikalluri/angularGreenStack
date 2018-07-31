'use strict';

var angular = require('angular');
var moment = require('moment');

require('angular-mocks');

var dateInfo = require('./date-info.component');

describe('date-info component', function() {
	beforeEach(function() {
		var mockTranslateFilter = function() {
			return function(input) {
				return input;
			};
		};
		var mockDaysFromNowFilter = function() {
			return function(dateString) {
				return moment(dateString).fromNow();
			};
		};
		var moduleName = 'trinet.shared.components.date-info';

		angular
			.module(moduleName, [])
			.filter('translate', mockTranslateFilter)
			.filter('daysFromNow', mockDaysFromNowFilter)
			.component('dateInfo', dateInfo);

		angular.mock.module(moduleName);
	});

	it('should display info about a given date', inject(function($rootScope, $compile) {
		var $scope = $rootScope.$new();
		var element;

		$scope.title = 'Next Holiday';
		$scope.titleColor = 'secondary';
		$scope.date = new Date();

		element = $compile('<date-info title="{{title}}" title-color="{{titleColor}}" date="date"></date-info>')($scope);
		$scope.$digest();

		expect(angular.element(element.find('div').children()[0]).hasClass('secondary')).toBeTruthy();
		expect(angular.element(element.find('div').children()[1]).html()).toContain(moment().format('MMM').toUpperCase());

	}));
});
