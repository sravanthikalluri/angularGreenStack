'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard';

var onboardingCardModule = require('./onboarding-card');
var paychecksCardModule = require('./paychecks-card');
var timeOffCardModule = require('./time-off-card');
var nextHolidayCardModule = require('./next-holiday-card');
var workInboxCardModule = require('./work-inbox-card');
var alertsCardModule = require('./bi-alerts-card');
var trinetReports = require('./trinet-reports');

module.exports = moduleName;

angular.module(moduleName, [onboardingCardModule, paychecksCardModule, timeOffCardModule, nextHolidayCardModule,workInboxCardModule,alertsCardModule,trinetReports])
	.component('dashboard', require('./dashboard.component'))
