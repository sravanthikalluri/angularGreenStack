'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-addl-amount';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateAddlAmount', require('./validate-addl-amount.directive'));
