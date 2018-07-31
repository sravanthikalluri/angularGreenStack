'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.company.company-overview';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('CurrentLocationService', require('./current-location.service'))
	.service('LocationsService', require('./locations.service'))
    .service('HeadQuartersAddressService', require('./headquartersaddress.service'));
