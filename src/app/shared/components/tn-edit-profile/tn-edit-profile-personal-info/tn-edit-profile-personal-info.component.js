'use strict';

require('./tn-edit-profile-personal-info.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-edit-profile/tn-edit-profile-personal-info/tn-edit-profile-personal-info.component.html',
	controller: TnEditProfilePersonalInfoController,
	bindings: {
		data: '<',
		formName: '<'
	}
};

/** @ngInject */
function TnEditProfilePersonalInfoController() {
	var ctrl = this;

	ctrl.$onInit = function() {

	}
}
