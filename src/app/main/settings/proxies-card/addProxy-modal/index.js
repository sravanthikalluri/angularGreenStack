'use strict';

var angular = require('angular');
var moduleName = 'app.main.settings.proxies-card.addProxy-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('proxiesCardModal', require('./addProxy-modal.component'));
