'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-percentage';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validatePercentage', require('./validate-percentage.directive'));
