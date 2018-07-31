'use strict';

require('./tn-profile-work.component.scss');

module.exports = {
	template: require('./tn-profile-work.component.html'),
	controller: ['$state', 'gso',TnProfileWorkController],
	bindings: {
		data: '<'
	}
};

/* @ngInject */
function TnProfileWorkController($state, gso) {
	var ctrl = this;
	ctrl.profileImage = gso.getAppConfig().profilePicture;
	ctrl.edit = function () {
		$state.go('app.main.edit-profile-work');
	}
}
