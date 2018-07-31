'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.security-card.custom-id-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('customIdModal', require('./custom-id-modal.component'));
