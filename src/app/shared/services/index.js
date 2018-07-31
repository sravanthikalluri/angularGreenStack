'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./menu'),
		require('./money'),
		require('./time-off'),
		require('./location'),
		require('./profile'),
		require('./authorize'),
		require('./data-service'),
		require('./company'),
		require('./org-chart'),
		require('./company-announcements'),
		require('./contact'),
		require('./util'),
		require('./combo-box'),
		require('./benefits'),
		require('./global'),
		require('./home'),
		require('./onboarding'),
	    require('./settings'),
	    require('./notices'),
	    require('./work-inbox'),
		require('./bi-alerts'),
		require('./sso'),
		require('./trinet-reports')
	])

	.service('services', require('./services.service'));
