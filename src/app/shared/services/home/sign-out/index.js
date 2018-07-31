'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.sign-out';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('signOut', require('./sign-out.service'));
