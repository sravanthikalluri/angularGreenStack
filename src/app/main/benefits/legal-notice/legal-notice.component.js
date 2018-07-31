'use strict';


require('./legal-notice.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/legal-notice/legal-notice.component.html',
	controller: ['DS',LegalNoticeController]
};

/* @ngInject */
function LegalNoticeController(DS) {
	var ctrl = this;
	ctrl.$onInit=function(){

	}
}
