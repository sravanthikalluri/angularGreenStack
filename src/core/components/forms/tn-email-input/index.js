'use strict'

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-email-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnEmailInput', require('./tn-email-input.component'));
