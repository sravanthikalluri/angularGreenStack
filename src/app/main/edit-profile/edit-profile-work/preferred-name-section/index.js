'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work.preferred-name-section';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('preferredNameSection', require('./preferred-name-section.component'));
