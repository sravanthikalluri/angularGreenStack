'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.tn-chip';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnChip', require('./tn-chip.component'));
