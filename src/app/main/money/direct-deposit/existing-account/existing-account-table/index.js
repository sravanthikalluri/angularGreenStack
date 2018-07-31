'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.existing-account.existing-account-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnExistingAccountTable', require('./existing-account-table.component'));
