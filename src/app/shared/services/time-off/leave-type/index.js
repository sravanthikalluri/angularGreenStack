'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.time-off.leave-type';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('LeaveType', require('./leave-type.service'))
	.service('Requests', require('./requests.service'));
