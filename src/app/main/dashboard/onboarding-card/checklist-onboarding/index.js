'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.onboarding-card.checklist-onboarding';

var commonOnboardingModule = require('./common-onboarding-content')
module.exports = moduleName;

angular.module(moduleName, [commonOnboardingModule])
	.component('checklistOnboarding', require('./checklist-onboarding.component'));
