'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.security-card.password-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('passwordModal', require('./password-modal.component'));
