'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.notices';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('notices', require('./notices.service'))
	.service('noticeEventBaseService', require('./notices-event.service'))
	.service('AleBasedService', require('./ale-based-notices.service'));
