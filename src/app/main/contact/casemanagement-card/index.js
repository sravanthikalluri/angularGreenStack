'use strict';

var angular = require('angular');
var moduleName = 'app.main.contact.casemanagement-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('casemanagementCard', require('./casemanagement-card.component'));
