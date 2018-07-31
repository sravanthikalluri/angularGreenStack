
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTooltipController = require('./tn-tooltip.component');

describe('tn-tooltip component', function () {
	var ctrl;
	var $scope;
	beforeEach(function () {

		var moduleName = 'trinet.shared.components.tn-tooltip';
		angular
			.module(moduleName, [])
			.component('tnTooltipController', tnTooltipController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController) {
		$scope = $rootScope.$new();

		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('tnTooltipController', locals, null);
	}));
	it('should initilise the component controller',function(){
		ctrl.$onInit();
	});

	it('should show tool tip', function () {
		ctrl.showTooltip();
	});
	it('should hide tool tip',function () {
		ctrl.hideTooltip();
	});
});
