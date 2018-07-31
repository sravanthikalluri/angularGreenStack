
'use strict';

var angular = require('angular');
require('angular-mocks');

var TnStackedBarChartDirective = require('./tn-stacked-bar-chart.component');

describe('tn-stacked-bar-chart.component', function () {
	var ctrl;
	var $scope;
	var rootScope,compile,element;
	beforeEach(function () {

		var moduleName = 'trinet.core.components.tn-stacked-bar-chart';
		angular
			.module(moduleName, [])
			.component('TnStackedBarChartDirective', TnStackedBarChartDirective);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope,$compile, $componentController) {
		$scope = $rootScope.$new();
		compile = $compile;
		var locals = {
			$scope: $scope,
		};
		ctrl = $componentController('TnStackedBarChartDirective', locals, null);
	}));
	/*it('tn-currency-format testing',function(){
		element = angular.element('<input type="text" value="stacked" ng-model="stacked" tn-stacked-bar-chart=""></input>');
	//	compile(element)(rootScope.$new());
	//	rootScope.$digest();
	});*/

});
