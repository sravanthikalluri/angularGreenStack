'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-checkbox';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnCheckbox', require('./tn-checkbox.component'));
