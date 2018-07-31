'use strict';

require('./employee-org-details.component.scss');

module.exports = {
	templateUrl: 'app/main/company/org-chart/employee-org-details/employee-org-details.component.html',
	bindings: {
		employee: '<',
		managers: '<',
		managerClicked: '&',
		profileView: '&'
	}
};
