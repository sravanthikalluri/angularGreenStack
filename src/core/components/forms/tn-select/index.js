'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-select';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnSelect', require('./tn-select.component'));
