'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.important-notices-card.view-notices-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('viewNoticeModal', require('./view-notices-modal'));

