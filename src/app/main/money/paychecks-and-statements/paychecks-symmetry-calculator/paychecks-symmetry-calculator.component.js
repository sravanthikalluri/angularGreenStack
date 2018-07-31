'use strict';

require('./paychecks-symmetry-calculator.component.scss');

module.exports = {
	templateUrl: 'app/main/money/paychecks-and-statements/paychecks-symmetry-calculator/paychecks-symmetry-calculator.component.html',
	controller: paychecksSymmetryCalculatorController,
	bindings: {
		payFrame: '=',
		selectedSymmetryCalc: '=',
		symmetryPaycheckCityInfo: '=',
		isBonusPayAggregate: '='
	}
};

/* @ngInject */
function paychecksSymmetryCalculatorController() {

	var ctrl = this;

	ctrl.hideCalc = function () {
		ctrl.payFrame = !ctrl.payFrame;
	};
	ctrl.setResidentValue = function(index) {
		setTimeout(function () {
			if(document.getElementsByName('locale[resident]').length > 0) {
				document.getElementsByName('locale[resident]')[index].value = ctrl.symmetryPaycheckCityInfo["model"]["locale[resident]"];
			}
		}, 3000);
	}

}
