'use strict';

var angular = require('angular');
var moduleName = 'starter.shared.services.profile.contacts';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('contacts', require('./contacts.service'));
