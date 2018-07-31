'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-name-input';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnNameInput', require('./tn-name-input.component'));
