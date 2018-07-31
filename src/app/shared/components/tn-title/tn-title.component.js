/**
 * Created by ganesh on 5/29/2017.
 */
'use strict';

require('./tn-title.component.scss');

module.exports = {
	template: require('./tn-title.component.html'),
	controller: ['gso',TitleController],
	bindings: {
		title: '<',
		url:'<'
	}
};

function TitleController(gso) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.employmentStatus = gso.getAppConfig().employmentStatus;
	};


}
