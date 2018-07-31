'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile.citizenship';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('CitizenShip', require('./citizenship.service.js'));
