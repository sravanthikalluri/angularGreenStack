'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.org-chart.find-employee-modal';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('findEmployeeModal', require('./find-employee-modal.component'));
