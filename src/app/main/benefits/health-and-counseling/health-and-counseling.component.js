'use strict';

require('./health-and-counseling.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/health-and-counseling/health-and-counseling.component.html',
	controller: ['DS',healthandCounselingController]
};
/* @ngInject */
function healthandCounselingController(DS) {
	var ctrl = this;
	ctrl.error = null;
	ctrl.showSpinner = true;
	ctrl.$onInit = function() {
		DS.find('health-and-counseling','').then(function(response) {
			ctrl.data = response.HealthAndCounselingService;
			ctrl.showSpinner = false;
		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
			ctrl.showSpinner = false;
		});
	};
}
