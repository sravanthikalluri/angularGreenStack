'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.proxies-card';

module.exports = moduleName;

angular.module(moduleName, [require('./addProxy-modal')])
	.component('proxiesCard', require('./proxies-card.component'));
