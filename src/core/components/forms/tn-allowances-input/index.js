'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.form.tn-allowances-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnAllowancesInput', require('./tn-allowances-input.component'));
