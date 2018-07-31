'use strict';

require('./tn-notice-card.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/legal-notice/tn-notice-card/tn-notice-card.component.html',
	controller: ['DS',tnNoticeCardController]
};

/* @ngInject */
function tnNoticeCardController(DS) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		DS.find('benefits-legal-notices', '').then(function(result) {
			ctrl.data = result;
			ctrl.showSpinner = false;
		});
	};

}
