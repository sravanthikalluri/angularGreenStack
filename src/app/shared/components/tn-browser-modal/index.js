'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.components.tn-browser-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('tnBrowserModal', require('./tn-browser-modal.component'));

