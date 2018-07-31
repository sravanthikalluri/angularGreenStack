'use strict';

require('./company-announcements.scss');

module.exports = {
	template: require('./company-announcements.component.html'),
	controller: ['$stateParams',CompanyAnnoucementsController]
};

/* @ngInject */
function CompanyAnnoucementsController($stateParams) {
	var ctrl = this;
	ctrl.anouncementData = $stateParams.id;
}
