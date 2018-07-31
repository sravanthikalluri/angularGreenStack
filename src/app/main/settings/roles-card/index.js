'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.roles-card';

module.exports = moduleName;

angular.module(moduleName, [require('./shared')])
	.component('rolesCard', require('./roles-card.component'));
