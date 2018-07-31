'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work.contact-section';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./email-contact'),
		require('./phone-contact')
	])

	.component('contactSection', require('./contact-section.component'));
