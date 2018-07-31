'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms.tn-zip-input';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnZipInput', require('./tn-zip-input.component'));
