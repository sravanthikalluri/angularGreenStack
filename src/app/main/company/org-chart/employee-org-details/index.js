'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.org-chart.employee-org-details';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('employeeOrgDetails', require('./employee-org-details.component'));
