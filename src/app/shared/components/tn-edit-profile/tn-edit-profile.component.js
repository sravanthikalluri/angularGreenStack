'use strict';

require('./tn-edit-profile.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-edit-profile/tn-edit-profile.component.html',
	controller: ['ProfileDataService',TnEditProfileController]
};

/** @ngInject */

function TnEditProfileController(ProfileDataService) {
    var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.data = ProfileDataService.getForm();
	};

	ctrl.savePersonalSection = function (formName) {
		if (formName.$valid) {
			ProfileDataService.savePersonalSection(ctrl.data);
		} else {
			alert('please fill out the fields....');
		}
	}
	ctrl.save = function(formName) {
		if (formName.$valid) {
			ctrl.data.successMessage = ProfileDataService.save(ctrl.data);
		} else {
			alert('please fill out the fields....');
		}
	};
}
