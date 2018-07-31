'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.important-notices-card';

module.exports = moduleName;

angular.module(moduleName, [require('./view-notice-modal')])
	.component('importantNoticesCard', require('./important-notices-card.component'));


