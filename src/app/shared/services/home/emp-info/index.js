'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.emp-info';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('EmployeeInfoService', require('./emp-info.service'));
