'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.direct-deposit.edit-account.edit-account-table';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('tnEditAccountTable', require('./edit-account-table.component'))
	.component('tnEditAccounModalPopup', require('./edit-account-modal-popup/edit-account-modal-popup.component'));
