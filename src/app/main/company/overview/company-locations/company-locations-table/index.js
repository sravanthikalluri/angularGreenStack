'use strict';

var angular = require('angular');
var moduleName = 'app.main.company.overview.company-locations.company-locations-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnCompanyLocationsTable', require('./company-locations-table.component'))
