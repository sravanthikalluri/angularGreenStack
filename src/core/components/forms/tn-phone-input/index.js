'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-phone-input';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnPhoneInput', require('./tn-phone-input.component'));
