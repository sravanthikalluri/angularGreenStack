'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.onboarding-card.checklist-onboarding.common-onboarding-content';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('commonOnboardingContent', require('./common-onboarding.component'));
