'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-personal.personal-id-section';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./ethnicity-modal')
	])
	.component('personalIdSection', require('./personal-id-section.component'));
