'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.org-chart';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('OrgChart', require('./org-chart.service'))
	.service('OrgChartFindDepartmentService',require('./org-chart-find-department.service'))
	.service('OrgChartFindEmployeesService', require('./org-chart-find-employees.service'));
