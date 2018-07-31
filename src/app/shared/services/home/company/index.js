'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.home.company';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('CompanyInfoService', require('./company.service'));
