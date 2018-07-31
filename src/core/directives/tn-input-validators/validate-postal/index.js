'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-postal';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validatePostal', require('./validate-postal.directive'));
