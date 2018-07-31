'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-personal.personal-id-section.ethnicity-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('ethnicityModal', require('./ethnicity-modal.component'));
