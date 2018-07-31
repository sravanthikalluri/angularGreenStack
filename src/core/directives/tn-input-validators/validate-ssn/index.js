'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-ssn';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateSsn', require('./validate-ssn.directive.js'));
