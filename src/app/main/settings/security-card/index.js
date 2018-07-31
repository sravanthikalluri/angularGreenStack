'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.security-card';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./shared'),
		require('./custom-id-modal'),
		require('./password-modal'),
		require('./secret-question-modal')
	])
	.component('securityCard', require('./security-card.component'));
