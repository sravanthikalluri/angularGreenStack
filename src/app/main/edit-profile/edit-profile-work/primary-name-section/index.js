'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work.primary-name-section';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('primaryNameSection', require('./primary-name-section.component'));
