'use strict';

require('./total-compensation-pay.component.scss');

module.exports = {
	template: require('./total-compensation-pay.component.html'),
	controller: TotalCompensationPayController
};

function TotalCompensationPayController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.colors = ['#6FBB4C','rgb(83,166,94)','#EEAE40'];
		ctrl.data=[
			{ label: 'Salary', amount: 37000 },
			{ label: 'Bonus', amount: 3000 }
		];
	};
}
