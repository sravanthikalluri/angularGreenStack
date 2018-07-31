'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.company-announcements-card';

module.exports = moduleName;

angular.module(moduleName, [])
		.component('companyAnnouncementsCard', require('./company-annoucements-card.component'))
