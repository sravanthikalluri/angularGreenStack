'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.underscroll';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('underscroll', require('./underscroll.filter'));
