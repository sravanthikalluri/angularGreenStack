'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-postal-input';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnPostalInput', require('./tn-postal-input.component'));
