'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.tn-pay-period';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnPayPeriod', require('./tn-pay-period.component'));
