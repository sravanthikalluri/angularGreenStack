'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-card.w4-modal.w4-modal-table.w4-amount-select';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('w4AmountSelect', require('./w4-amount-select.component'));
