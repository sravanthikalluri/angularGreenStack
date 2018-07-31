'use strict';

var angular = require('angular');
var currentCompanyIdCookie = require('./current-company-id-cookie/current-company-id-cookie.service');
var moduleName = 'trinet.shared.services.time-off';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./leave-type'),
		require('./holiday')
	])
	.service('CurrentCompanyIdCookie', currentCompanyIdCookie);
