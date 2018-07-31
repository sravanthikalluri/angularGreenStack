'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-card';

module.exports = moduleName;

angular.module(moduleName, [
		require('./w4-table'),
		require('./w4-modal'),
		require('./w4-date-select')
	])

	.component('w4Card', require('./w4-card.component'));
