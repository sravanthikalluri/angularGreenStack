'use strict';

require('./tn-small-employee-card.component.scss');

module.exports = {
	template:  require('./tn-small-employee-card.component.html'),
	controller: TnSmallEmployeeCardController,
	bindings: {
		employeeInfo: '<',
		showDirectReports: '<',
		directReportsClicked: '&'
	}
};

function TnSmallEmployeeCardController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		//Show by default if not specified
		if(ctrl.showDirectReports === undefined) {
			ctrl.showDirectReports = true;
		}
	}
}
