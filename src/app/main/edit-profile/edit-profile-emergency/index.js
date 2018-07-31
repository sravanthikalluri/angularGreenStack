'use strict';

var angular = require('angular');

var moduleName = 'app.main.edit-profile-emergency';

module.exports = moduleName;

angular.module(moduleName, [
		require('./emergency-contact-section'),
		require('./shared')
	])
	.component('editProfileEmergency', require('./edit-profile-emergency.component'));
