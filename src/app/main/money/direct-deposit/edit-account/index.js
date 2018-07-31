'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.edit-account';
var editAccountTableModule = require('./edit-account-table');
var editReimbursableAccountTable = require('./edit-reimbursable-account');


module.exports = moduleName;

angular.module(moduleName, [editAccountTableModule,editReimbursableAccountTable])
	.component('tnEditAccount', require('./edit-account.component'));
