'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.settings.preferences';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('Preferences', require('./preferences.service'));
