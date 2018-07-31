'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.ssn';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('SSN', require('./ssn.service'));
