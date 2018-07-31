'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-stacked-bar-chart';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('tnStackedBarChart', require('./tn-stacked-bar-chart.component'));
