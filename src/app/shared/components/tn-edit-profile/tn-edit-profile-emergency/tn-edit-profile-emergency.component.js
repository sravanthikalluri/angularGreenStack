'use strict';

module.exports = {
	templateUrl: 'app/shared/components/tn-edit-profile/tn-edit-profile-emergency/tn-edit-profile-emergency.component.html',
	controller: ['ProfileDataService',TnEditProfileEmergencyController]
};

/** @ngInject */

function TnEditProfileEmergencyController(ProfileDataService) {
	var ctrl = this;
	ctrl.$onInit = function () {
		ctrl.data = ProfileDataService.getForm();
		ctrl.data.emergencyContact = ProfileDataService.getForm().emergencyContacts[0];
		ctrl.data.emergencyContact.name.name = ProfileDataService.getForm().emergencyContacts[0].firstName ? ProfileDataService.getForm().emergencyContacts[0].firstName : ProfileDataService.getForm().emergencyContacts[0].name.fullName;
		ctrl.data.emergencyContact.name.fullName = ProfileDataService.getForm().emergencyContacts[0].name.fullName;
		ctrl.data.emergencyContact.primaryContactFlag === 'Y' ? ctrl.data.emergencyContact.isPrimaryContact = true : ctrl.data.emergencyContact.isPrimaryContact = false;
		ctrl.data.emergencyContact.sameAddressPerson === 'Y' ? ctrl.data.emergencyContact.isSameAsEmployeeAddress = true : ctrl.data.emergencyContact.isSameAsEmployeeAddress = false;
	};

	ctrl.createEmergecny = function (formName) {
		ctrl.data.emergencyContact.name.lastName = ctrl.data.emergencyContact.name.name;
		ctrl.data.emergencyContact.name.firstName = ctrl.data.emergencyContact.name.name;
		ctrl.data.emergencyContact.isPrimaryContact ? (ctrl.data.emergencyContact.primaryContactFlag = 'Y') : (ctrl.data.emergencyContact.primaryContactFlag = 'N');
		ctrl.data.emergencyContact.isSameAsEmployeeAddress ? (ctrl.data.emergencyContact.sameAddressPerson = 'Y') : (ctrl.data.emergencyContact.sameAddressPerson = 'N');
		if (formName.$valid) {
			ctrl.data.successMessage = ProfileDataService.saveEmergency(ctrl.data.emergencyContact);
		} else {
			alert('please fill out the fields....');
		}
	};

	ctrl.getEmpAddress = function (bool) {
		ctrl.data.emergencyContact.isSameAsEmployeeAddress = bool;
		if (bool) {
			ctrl.data.emergencyContact.address.address1 = ctrl.data.address.address1;
			ctrl.data.emergencyContact.address.address2 = ctrl.data.address.address2;
			ctrl.data.emergencyContact.address.city = ctrl.data.address.city;
			ctrl.data.emergencyContact.address.state = ctrl.data.address.state;
			ctrl.data.emergencyContact.address.postalCode = ctrl.data.address.postalCode;
		}

	}
}
