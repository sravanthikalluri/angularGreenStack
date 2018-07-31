'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.constants';

module.exports = moduleName;

angular.module(moduleName, [])
	.constant('COUNTRIES', require('./countries.constant'))
	.constant('US_STATES', require('./us-states.constant'))
	.constant('CA_PROVINCES', require('./ca-provinces.constant'))
	.constant('GENDERS', require('./genders.constant'))
	.constant('MARITAL_STATUSES', require('./marital-statuses.constant'))
	.constant('MILITARY_STATUSES', require('./military-statuses.constant'))
	.constant('ETHNICITIES', require('./ethnicities.constant'))
	.constant('CONTACT_RELATIONSHIPS', require('./contact-relationships.constant'));
