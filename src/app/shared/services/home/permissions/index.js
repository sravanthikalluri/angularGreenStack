'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.permissions';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('PermissionsService', require('./permissions.service'));
