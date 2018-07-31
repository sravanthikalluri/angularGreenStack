'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.preferences-card';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./preferences-modal'),
		require('./shared')
	])
	.component('preferencesCard', require('./preferences-card.component'));
