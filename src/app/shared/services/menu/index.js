'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.menu';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Menu', require('./menu.service'));
