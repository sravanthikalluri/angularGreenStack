'use strict';

var angular = require('angular');
var moduleName = 'app.main.team.pending-approvals-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('pendingApprovalsCard', require('./pending-approvals-card.component'));

