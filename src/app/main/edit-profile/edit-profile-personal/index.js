'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-personal';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./home-address-section'),
		require('./personal-id-section'),
		require('./personal-status-section'),
		require('./shared')
	])
	.component('editProfilePersonal', require('./edit-profile-personal.component'));
