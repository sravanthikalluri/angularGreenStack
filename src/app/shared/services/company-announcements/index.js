'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.companyAnnouncements';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('companyAnnouncements', require('./company-announcements.service'));
