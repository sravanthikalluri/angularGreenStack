'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-zip';

module.exports = moduleName;

angular.module(moduleName, [])
	.directive('validateZip', require('./validate-zip.directive'));
