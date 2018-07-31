'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-card.w4-date-select';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('w4DateSelect', require('./w4-date-select.component'));
