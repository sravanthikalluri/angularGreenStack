'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work.contact-section.phone-contact';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('phoneContact', require('./phone-contact.component'));
