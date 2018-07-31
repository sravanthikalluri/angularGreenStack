'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.w4-card.w4-table';

module.exports = moduleName;

angular
	.module(moduleName, [require('./w4-pdf-links')])
	.component('w4Table', require('./w4-table.component'));
