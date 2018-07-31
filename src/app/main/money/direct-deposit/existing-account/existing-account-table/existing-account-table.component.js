'use strict';

require('./existing-account-table.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/existing-account/existing-account-table/existing-account-table.component.html',
	controller: ExistingAccountTableController,
	bindings: {
		data: '<'
	}
};
/* @ngInject */
function ExistingAccountTableController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.titles = [
			{
				title: 'Order',
				class: 'order'
			},
			{
				title: 'Account',
				class: 'name'
			},
			{
				title: 'Net Balance',
				class: 'net-balance'
			},
			{
				title: 'Deposit',
				class: 'amount'
			},
			{
				title: 'Estimated Amount',
				class: 'estimated-amount',
				tooltip: 'true'
			}
		];

	};



}
