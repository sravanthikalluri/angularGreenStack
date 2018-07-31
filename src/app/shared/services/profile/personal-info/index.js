'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.personal-info';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('PersonalInfo', require('./personal-info.service'))
	.service('PersonalInfoSelf', require('./personal-info-self.service'));
