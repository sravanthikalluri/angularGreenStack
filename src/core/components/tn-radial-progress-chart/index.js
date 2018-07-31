'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-radial-progress-chart';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('tnRadialProgressChart', require('./tn-radial-progress-chart.component'));
