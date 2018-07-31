'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.date-info';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('dateInfo', require('./date-info.component'));
