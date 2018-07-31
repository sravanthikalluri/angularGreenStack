'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-emergency.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('editProfileEmergency', require('./edit-profile-emergency.service'))
	.constant('emergencyContactTemplate', require('./emergency-contact-template.constant'));
