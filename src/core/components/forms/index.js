'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.components.forms';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./tn-name-input'),
		require('./tn-email-input'),
		require('./tn-phone-input'),
		require('./tn-address-input'),
		require('./tn-city-input'),
		require('./tn-zip-input'),
		require('./tn-postal-input'),
		require('./tn-dob-input'),
		require('./tn-ssn-input'),
		require('./tn-select'),
		require('./tn-notes-input'),
		require('./tn-addl-amt-input'),
		require('./tn-allowances-input'),
		require('./tn-annual-exemption-amt-input')
	]);
