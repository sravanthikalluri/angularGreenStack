'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('editProfileWork', require('./edit-profile-work.service'))
	.constant('nameTemplate', require('./name-template.constant'))
	.constant('contactTemplate', require('./contact-template.constant'))
	.constant('emailTypesTemplate', require('./email-types.constant'))
	.constant('phoneTypesTemplate', require('./phone-types.constant'));
