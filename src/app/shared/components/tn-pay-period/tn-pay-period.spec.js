'use strict';

var angular = require('angular');
require('angular-mocks');

var tnPayPeriod = require('./tn-pay-period.component');

describe('tn-pay-period component', function() {
	beforeEach(function() {
		var moduleName = 'trinet.shared.components.tn-pay-period';

		angular
			.module(moduleName, [])
			.component('tnPayPeriod', tnPayPeriod);

		angular.mock.module(moduleName);
	});

	it('should display the date range', inject(function($rootScope, $compile) {
		var $scope = $rootScope.$new();
		var element;

		$scope.data = { payPeriod: 'Jun 15 - Jun 26' };

		element = $compile('<tn-pay-period dates="data.payPeriod"></tn-pay-period>')($scope);
		$scope.$digest();

		expect(angular.element(element.find('div').children()[0]).hasClass('icon-icon_calendar')).toBeTruthy();
		expect(angular.element(element.find('div').children()[1]).text()).toEqual('Jun 15 - Jun 26');
	}));
});
