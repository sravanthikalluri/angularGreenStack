'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.notices-event-base-card';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('noticeEventBase', require('./notices-event-base-card.component'));


