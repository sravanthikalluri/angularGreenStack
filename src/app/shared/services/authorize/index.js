'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.authorize';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('AuthenticationService', require('./authentication.service'))
	.service('UserServiceLocal', require('./user.service.local'));
