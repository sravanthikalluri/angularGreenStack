'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-work';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./primary-name-section'),
		require('./preferred-name-section'),
		require('./contact-section'),
		require('./shared')
	])
	.component('editProfileWork', require('./edit-profile-work.component'));
