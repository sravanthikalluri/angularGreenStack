'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.settings.security';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('CustomId', require('./custom-id.service'))
	.service('Employees', require('./employees.service'))
	.service('SecretQuestion', require('./secret-question.service'))
	.service('SecurityMfa', require('./mfa.service'))
	.service('Password', require('./password.service'));
