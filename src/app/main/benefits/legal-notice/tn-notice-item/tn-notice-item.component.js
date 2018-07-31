'use strict';

require('./tn-notice-item.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/legal-notice/tn-notice-item/tn-notice-item.component.html',
	controller: ['gso', tnNoticeItemController],
	bindings:{
		data: '<',
		onSelect: '&'
	}
};

/* @ngInject */
function tnNoticeItemController(gso) {
	var ctrl = this;
	ctrl.$onInit=function(){
		ctrl.titleId = gso.getUtilService().compIdGen(ctrl.data.title,"Link");
	}
}
