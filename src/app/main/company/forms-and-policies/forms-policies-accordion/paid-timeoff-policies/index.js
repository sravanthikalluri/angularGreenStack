'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.paid-timeoff-policies';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('paidTimeOffPolicies', require('./paid-timeoff.component'));
