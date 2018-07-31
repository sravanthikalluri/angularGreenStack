'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-input-container';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnInputContainer', require('./tn-input-container.component'));
