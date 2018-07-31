'use strict';

var angular = require('angular');
var moduleName = 'starter.shared.services.profile.address';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Address', require('./address.service'));
