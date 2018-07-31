'use strict';

require('./bi-alerts-card.component.scss');

module.exports = {
	template: require('./bi-alerts-card.component.html'),
	controller: ['SharedDataService', '$window', 'gso', AlertsCardController],
	bindings: {
		alerts: '<'
	}
};

/* @ngInject */
function AlertsCardController(SharedDataService, $window, gso) {
	var ctrl = this;

	ctrl.viewAlerts = function () {
		var alertURL = SharedDataService.getAppSharedData().reportsuiBaseUrl+'/UIGateway.jsp?companyId=' + gso.getAppConfig().companyId
						+ '&employeeId=' + $window.sessionStorage.getItem('empId') +'&source=Alerts';

		$window.open(alertURL,'_blank');
	};
}
