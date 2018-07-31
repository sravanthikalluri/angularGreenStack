'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.onboarding-card';

var checkListOnboardingModule = require('./checklist-onboarding');
var i9OnboardingModule = require('./i9-onboarding');
module.exports = moduleName;

angular.module(moduleName, [checkListOnboardingModule, i9OnboardingModule])
	.component('onboardingCard', require('./onboarding-card.component'));
