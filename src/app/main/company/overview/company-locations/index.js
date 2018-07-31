'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.overview.company-locations';
var companyLocationsTableModule = require('./company-locations-table');

module.exports = moduleName;

angular.module(moduleName, [companyLocationsTableModule])
	.component('tnCompanyLocations', require('./company-locations.component'))
