'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-card.w4-modal';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./w4-modal-table'),
		require('./w4-legal-modal')
	])

	.component('w4Modal', require('./w4-modal.component'));

