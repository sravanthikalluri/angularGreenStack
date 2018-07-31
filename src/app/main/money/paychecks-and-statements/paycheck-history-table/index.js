'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.paycheck-history-table.paycheck-history-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('paycheckHistoryTable', require('./paycheck-history-table.component'));
