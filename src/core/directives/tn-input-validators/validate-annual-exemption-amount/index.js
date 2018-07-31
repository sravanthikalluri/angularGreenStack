'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-exemption-amount';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validateAnnualExemptionAmount', require('./validate-annual-exemption-amount.directive'));
