'use strict';

var angular = require('angular');
var moduleName = 'starter.shared.services.profile.emergency-contacts';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('EmergencyContacts', require('./emergency-contacts.service'));
