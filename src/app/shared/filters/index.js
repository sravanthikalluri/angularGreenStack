'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.filters';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./marital-status'),
		require('./military-status'),
		require('./ethnicity'),
		require('./contact-relationship'),
		require('./gender'),
		require('./country'),
		require('./state'),
		require('./service-date'),
		require('./days-from-now'),
		require('./benefits'),
		require('./company'),
		require('./employee'),
		require('./global'),
		require('./home'),
		require('./money'),
		require('./profile'),
		require('./ssn'),
		require('./effective-date'),
		require('./ellipsize'),
		require('./underscroll')
	]);
