'use strict';

var angular = require('angular');
var moduleName = 'app.main.contact.employee-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('employeeCard', require('./employee-card.component.js'));
