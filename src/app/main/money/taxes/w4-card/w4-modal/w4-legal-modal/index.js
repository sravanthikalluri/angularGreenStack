'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-card.w4-modal.w4-legal-modal';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('w4LegalModal', require('./w4-legal-modal.component'));

