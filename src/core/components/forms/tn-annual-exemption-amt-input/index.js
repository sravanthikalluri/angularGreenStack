'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.form.tn-annular-exemption-amt-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnAnnualExemptionAmtInput', require('./tn-annual-exemption-amt-input.component'));
