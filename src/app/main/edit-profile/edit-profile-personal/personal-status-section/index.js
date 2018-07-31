'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-personal.personal-status-section';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('personalStatusSection', require('./personal-status-section.component'));
