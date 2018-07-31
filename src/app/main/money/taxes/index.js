'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes';

module.exports = moduleName;

angular.module(moduleName, [
		require('./w2-card'),
		require('./w4-card'),
		require('./shared')
	])

	.component('tnTaxes', require('./taxes.component'));
