'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-card.w4-modal.w4-modal-table';

module.exports = moduleName;

angular.module(moduleName, [
		require('./w4-marital-status-tooltip'),
		require('./w4-amount-select')
	])

	.component('w4ModalTable', require('./w4-modal-table.component'));
