'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.form.tn-addl-amt-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnAddlAmtInput', require('./tn-addl-amt-input.component'));
