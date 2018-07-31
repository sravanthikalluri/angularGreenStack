'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.settings.roles';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('roles', require('./roles.service'))
	.service('EmployeeRoles', require('./employee.service'))
	.service('department',require('./department.service'))
	.service('companyLocation',require('./location.service'))
	.service('payGroup',require('./paygroup.service'));
