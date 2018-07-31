
'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.forms-policies-acc';
var stateSpecificFormsModule = require('./state-specific-forms');
var termsAndConditionsModule = require('./terms-and-conditions');
var paidTimeOffPoliciesModule= require('./paid-timeoff-policies');

module.exports = moduleName;

angular.module(moduleName, [stateSpecificFormsModule,termsAndConditionsModule,paidTimeOffPoliciesModule])
	.component('formsPoliciesAcc', require('./forms-policies-acc.component'))
