'use strict';

require('./tn-profile-personal.component.scss');

module.exports = {
	template: require('./tn-profile-personal.component.html'),
	controller: ['$state',TnProfilePersonalController],
	bindings: {
		data: '<'
	}
};

/* @ngInject */
function TnProfilePersonalController($state) {
	var ctrl = this;

	ctrl.edit = function() {
		$state.go('app.main.edit-profile-personal');
	}
}
