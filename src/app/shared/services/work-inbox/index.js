'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.work-inbox';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('WorkInbox', require('./work-inbox.service'));
