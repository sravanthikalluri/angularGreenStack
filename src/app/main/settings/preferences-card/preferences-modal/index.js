'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.preferences-card.preferences-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('preferencesModal', require('./preferences-modal.component'));
