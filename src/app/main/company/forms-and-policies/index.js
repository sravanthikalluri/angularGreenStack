'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.forms-and-policies';
var formsPoliciesAccordionModule = require('./forms-policies-accordion');

module.exports = moduleName;

angular.module(moduleName, [formsPoliciesAccordionModule])
	.component('tnFormsAndPolicies', require('./forms-and-policies.component'))
