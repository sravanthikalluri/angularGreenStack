'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.org-chart';
var employeeOrgDetails = require('./employee-org-details');
var findEmployeeModal = require('./find-employee-modal');

module.exports = moduleName;

angular.module(moduleName, [employeeOrgDetails, findEmployeeModal])
	.component('orgChart', require('./org-chart.component'));
