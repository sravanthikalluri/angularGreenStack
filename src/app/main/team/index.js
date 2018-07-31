'use strict';

var angular = require('angular');
var moduleName = 'app.main.team';
var modules = [
	require('./team-calendar-card'),
	require('./pending-approvals-card')
];
module.exports = moduleName;

angular.module(moduleName, modules)
	.component('team', require('./team.component'));
