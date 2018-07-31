'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-city';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateCity', require('./validate-city.directive'));
