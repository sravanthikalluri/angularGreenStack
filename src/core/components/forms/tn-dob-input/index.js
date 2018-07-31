'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-dob-input';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnDobInput', require('./tn-dob-input.component'));
