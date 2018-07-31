'use strict';

var angular = require('angular');
var moduleName = 'app.main.team.team-calendar-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('teamCalendarCard', require('./team-calendar-card.component'));

