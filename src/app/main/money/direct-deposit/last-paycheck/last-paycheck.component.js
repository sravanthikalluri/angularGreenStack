'use strict';

require('./last-paycheck.component.scss');

module.exports = {
	templateUrl: 'app/main/money/direct-deposit/last-paycheck/last-paycheck.component.html',
	controller: LastPaycheckController,
	bindings: {
		paychecks: '<'
	}
};

/* @ngInject */
function LastPaycheckController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		if (ctrl.paychecks.checkSummaries && ctrl.paychecks.checkSummaries.length !== 0) {
			ctrl.lastPayCheckDetails = ctrl.paychecks.checkSummaries[0];
		}
	};

}
