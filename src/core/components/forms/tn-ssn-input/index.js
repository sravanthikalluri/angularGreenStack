'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-ssn-input';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnSsnInput', require('./tn-ssn-input.component'));
