'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.emp-details';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('EmployeeDetailsService', require('./emp-details.service'))
	.service('TotalEmployeeDetailsService', require('./emp-details-everything.service'));
