'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work.contact-section.email-contact';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('emailContact', require('./email-contact.component'));
