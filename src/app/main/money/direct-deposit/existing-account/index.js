'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.existing-account';
var existingAccountTableModule = require('./existing-account-table');
var existingReimbursableAccountModule = require('./existing-reimbursable-account');


module.exports = moduleName;

angular.module(moduleName, [existingAccountTableModule,existingReimbursableAccountModule])
	.component('tnExistingAccount', require('./existing-account.component'));
