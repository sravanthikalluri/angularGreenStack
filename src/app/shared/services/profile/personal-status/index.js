'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.personal-status';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('PersonalStatus', require('./personal-status.service'));
