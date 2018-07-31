'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.onboarding';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('OnboardingGetTasks', require('./onboarding-get-tasks.service'))
	.service('OnboardingI9Status', require('./onboarding-i9-status.service'))
	.service('OnboardingPostTask', require('./onboarding-post-task.service'));
