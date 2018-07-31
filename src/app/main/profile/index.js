'use strict';

var angular = require('angular');

var moduleName = 'app.main.profile';

module.exports = moduleName;

angular.module(moduleName, [
		require('./profile-map-card')
	])

	.component('profile', require('./profile.component'));
