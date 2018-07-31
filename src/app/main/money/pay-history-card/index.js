'use strict';

var angular = require('angular');
var payHistoryTableModule = require('./pay-history-table');
var moduleName = 'app.main.money.pay-history-card';

module.exports = moduleName;

angular.module(moduleName, [payHistoryTableModule])
	.component('payHistoryCard', require('./pay-history-card.component'));
