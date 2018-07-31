'use strict';

var angular = require('angular');
var moduleName = 'app.main.edit-profile.edit-profile-personal.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('editProfilePersonal', require('./edit-profile-personal.service'));
