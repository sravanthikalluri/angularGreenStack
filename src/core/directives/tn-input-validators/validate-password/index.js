'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators.validate-password';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.directive('validatePassword', require('./validate-password.directive'))
	.directive('validateCheck', require('./validate-pwdCheck.directive'))
	.directive('validateNew', require('./validate-newCheck.directive'));
