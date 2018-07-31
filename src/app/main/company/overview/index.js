'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.overview';
var overviewTableModule = require('./overview-table');
var companyLocationsModule = require('./company-locations');

module.exports = moduleName;

angular.module(moduleName, [overviewTableModule,companyLocationsModule])
	.component('tnCompanyOverview', require('./overview.component'));
