'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters.contact-relationship';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.filter('contactRelationship', require('./contact-relationship.filter'));
