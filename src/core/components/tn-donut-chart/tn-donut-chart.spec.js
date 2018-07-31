'use strict'

var angular = require('angular');
require('angular-mocks');

var tnDonutChart = require('./tn-donut-chart.component');
var rootScope,compile,element;

describe('tn bind html directive', function() {
	beforeEach(function() {

		var moduleName = 'trinet.core.components.tn-donut-chart';

		angular
			.module(moduleName, [])
			.directive('tnDonutChart', tnDonutChart);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile){
		rootScope = $rootScope;
		compile = $compile;

	}));


	it('tn-donut-chart testing',function(){
		element = angular.element('<tn-bind-html content="directive"></tn-bind-html>');
		compile(element)(rootScope.$new());
		rootScope.$digest();
	});

});
