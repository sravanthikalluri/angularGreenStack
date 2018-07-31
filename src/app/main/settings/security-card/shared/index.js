'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.security-card.shared';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.service('security', require('./security.service'))
	.constant('securityModalConfig', require('./security-modal-config.constant'));
