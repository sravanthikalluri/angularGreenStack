'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.compliance';
var legalNoticesModule = require('./legal-notices');

module.exports = moduleName;

angular.module(moduleName, [legalNoticesModule])
	.component('complianceNotices', require('./compliance.component'));
