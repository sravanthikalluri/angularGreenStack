'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.ellipsize';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('ellipsize', require('./ellipsize.filter'));
