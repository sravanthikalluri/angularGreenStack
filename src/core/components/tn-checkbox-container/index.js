'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-checkbox-container';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnCheckboxContainer', require('./tn-checkbox-container.component'));
