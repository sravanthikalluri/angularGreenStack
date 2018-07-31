'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.marital-status';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('maritalStatus', require('./marital-status.filter'));
