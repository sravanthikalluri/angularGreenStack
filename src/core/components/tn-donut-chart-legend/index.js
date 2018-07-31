'use strict';

var angular = require('angular');
var moduleName = 'app.core.components.tn-donut-chart-legend.tn-donut-chart-legend';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnDonutChartLegend', require('./tn-donut-chart-legend.component'));
