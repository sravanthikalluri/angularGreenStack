'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.work';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('Work', require('./work.service'));
