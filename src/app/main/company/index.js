'use strict';

var angular = require('angular');
var moduleName = 'app.main.company';

var companyDirectoryModule = require('./company-directory');
var orgChartModule = require('./org-chart');
var holidayCalendarModule = require('./holiday-calendar');
var overviewModule = require('./overview');
var formsAndPolicies = require('./forms-and-policies');
var compliance = require('./compliance');
var eformsAcknowledgement = require('./eforms-acknowledgement');


module.exports = moduleName;

angular.module(moduleName, [companyDirectoryModule,orgChartModule,holidayCalendarModule,overviewModule,formsAndPolicies,compliance,eformsAcknowledgement])
	.component('tnCompany', require('./company.component'));
