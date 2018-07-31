'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-emergency.emergency-contact-section';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('emergencyContactSection', require('./emergency-contact-section.component'));
