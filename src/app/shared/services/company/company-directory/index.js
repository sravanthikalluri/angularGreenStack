'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.company.company-directory';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('CompanyDirectoryService', require('./company-directory.service'))
	.service('EmployeeService', require('./employee-service'));
