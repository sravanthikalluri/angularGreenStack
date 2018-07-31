'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.form.tn-address-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnAddressInput', require('./tn-address-input.component'));
