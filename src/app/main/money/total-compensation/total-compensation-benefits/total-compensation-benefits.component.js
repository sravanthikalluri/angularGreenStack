'use strict';

require('./total-compensation-benefits.component.scss');

module.exports = {
	template: require('./total-compensation-benefits.component.html'),
	controller: TotalCompensationBenefitsController
};

function TotalCompensationBenefitsController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.colors = ['#EEAE40'];
		ctrl.data=[
			{ label: 'Medical', amount: 10000 },
			{ label: 'Medical', amount: 2500 },
			{label:'Medical', amount:2500 }
		];
	};
}
