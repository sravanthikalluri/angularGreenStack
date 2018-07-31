'use strict';

require('./tn-benefit-best-doctors.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/overview/tn-benefit-best-doctors/tn-benefit-best-doctors.component.html',
	bindings: {
		data: '<'
	},
	controller: ['$timeout', '$window', BenefitsBestDoctorsController]
};

function BenefitsBestDoctorsController($timeout, $window) {
	var ctrl = this;

	ctrl.$onInit = function () {
		ctrl.showSpinner = true;
	}

	ctrl.openPdf = function (url) {
		var urlLink = '/api-content' + url;
		$window.open(urlLink, '_blank');
	};

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 1000);
}
