'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-donut-chart';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('tnDonutChart', require('./tn-donut-chart.component'));
