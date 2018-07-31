'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.edit-reimbursable-account.edit-reimbursable-account-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnEditReimbursableAccountTable', require('./edit-reimbursable-account-table.component'));
