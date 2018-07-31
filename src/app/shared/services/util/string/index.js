'use strict'

var angular = require('angular');
var moduleName = 'trinet.shared.services.util.string';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('stringUtil', require('./string-util.service'));
