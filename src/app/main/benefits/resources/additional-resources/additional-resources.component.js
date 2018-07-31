'use strict';

require('./additional-resources.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/additional-resources.component.html',
	controller: ['$window',BenefitsPlansCarriersController],
	bindings: {
		planCarriersCtrldocMeta: '<'
	}
};

/* @ngInject */
function BenefitsPlansCarriersController( $window) {
	var ctrl = this;

	ctrl.error = null;

	ctrl.openWin = function (url) {
		$window.open(url);
	};

	ctrl.getPdfLink = function (num) {
		return new Array(num);
	};

	ctrl.$onInit = function() {

	};
}
