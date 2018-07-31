'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives.tn-input-validators';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./validate-name'),
		require('./validate-phone'),
		require('./validate-email'),
		require('./validate-address'),
		require('./validate-city'),
		require('./validate-zip'),
		require('./validate-postal'),
		require('./validate-retirement-amount'),
		require('./validate-ssn'),
		require('./validate-routing-number'),
		require('./validate-custom'),
		require('./validate-password'),
		require('./validate-dob'),
		require('./validate-percentage'),
		require('./validate-dollar-amount'),
		require('./validate-addl-amount'),
		require('./validate-annual-exemption-amount'),
		require('./validate-entry')
	]);
