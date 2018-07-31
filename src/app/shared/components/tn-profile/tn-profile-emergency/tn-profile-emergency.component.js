'use strict';

require('./tn-profile-emergency.component.scss');

module.exports = {
	template: require('./tn-profile-emergency.component.html'),
	controller: ['$state',TnProfileEmergencyController],
	bindings: {
		data: '<'
	}
};

/* @ngInject */
function TnProfileEmergencyController($state) {
	var ctrl = this;

	ctrl.edit = function() {
		$state.go('app.main.edit-profile-emergency');
	}
}
