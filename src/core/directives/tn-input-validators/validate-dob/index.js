'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-dob';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateDob', require('./validate-dob.directive'));
