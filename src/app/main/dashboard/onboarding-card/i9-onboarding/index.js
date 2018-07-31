'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.onboarding-card.i9-onboarding';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('i9Onboarding', require('./i9-onboarding.component'));
