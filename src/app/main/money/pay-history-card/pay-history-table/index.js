'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.pay-history-card.pay-history-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('payHistoryTable', require('./pay-history-table.component'));
