'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.picture';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('ProfilePicture', require('./picture.service'));
