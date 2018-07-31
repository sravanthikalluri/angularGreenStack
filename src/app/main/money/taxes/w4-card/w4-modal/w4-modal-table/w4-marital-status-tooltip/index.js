'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-elections-card.w4-elections-modal.w4-marital-status-tooltip';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('w4MaritalStatusTooltip', require('./w4-marital-status-tooltip.component'));
