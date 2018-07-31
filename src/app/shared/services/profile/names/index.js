'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.names';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Names', require('./names.service'));
