'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.company';

module.exports = moduleName;

angular.module(moduleName, [
	require('./company-directory'),
	require('./company-overview'),
	require('./company-forms-policies')
])

