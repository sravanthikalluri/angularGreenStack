'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.overview.overview-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnCompanyOverviewTable', require('./overview-table.component'));
