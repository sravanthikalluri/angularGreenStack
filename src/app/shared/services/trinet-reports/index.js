'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.trinet-reports';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('trinetReportsTerminationDateService', require('./trinet-reports-terminationDate.service'));
