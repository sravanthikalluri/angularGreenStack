'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.state';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('state', require('./state.filter.js'));
