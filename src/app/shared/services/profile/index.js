'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.profile-names';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./address'),
		require('./emergency-contacts'),
		require('./names'),
		require('./personal-info'),
		require('./personal-status'),
		require('./work'),
		require('./contacts'),
		require('./citizenship'),
		require('./ssn'),
		require('./picture'),
		require('./compensation')
	])

	.service('profileUpdateService', require('./profile-update.service'));
