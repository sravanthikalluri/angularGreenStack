'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.roles-card.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('roleService', require('./roles-data.service'));
