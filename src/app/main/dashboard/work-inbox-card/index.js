'use strict';

var angular = require('angular');
var moduleName = 'app.main.dashboard.work-inbox-card';
module.exports = moduleName;

angular.module(moduleName,[])
	.component('workInboxCard', require('./work-inbox-card.component'));
