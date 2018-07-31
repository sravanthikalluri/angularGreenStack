'use strict';

var angular = require('angular');

var moduleName = 'app.main.edit-profile';

module.exports = moduleName;

angular.module(moduleName, [
	require('./edit-profile-work'),
	require('./edit-profile-personal'),
	require('./edit-profile-emergency')
]);
