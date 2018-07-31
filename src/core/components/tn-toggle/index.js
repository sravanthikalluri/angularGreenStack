'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-toggle';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnToggle', require('./tn-toggle.component'));
