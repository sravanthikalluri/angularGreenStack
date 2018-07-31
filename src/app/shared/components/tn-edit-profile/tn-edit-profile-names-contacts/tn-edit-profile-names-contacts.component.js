'use strict';
require('./tn-edit-profile-names-contacts.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-edit-profile/tn-edit-profile-names-contacts/tn-edit-profile-names-contacts.component.html',
	controller: ['ProfileDataService', 'moment',TnEditProfileNamesContactsController]
};

/** @ngInject **/

function TnEditProfileNamesContactsController(ProfileDataService, moment) {
	var ctrl = this;
	ctrl.isFirstPhone = -1;
	ctrl.isFirstEmail = -1;
	ctrl.date = moment(new Date()).format('YYYY-MM-DD');

	ctrl._createObject = function (type) {
		return {
			employeeId: ctrl.data.names.names.priNamesActiveList[0].employeeId,
			uniqueId: "",
			accessType: ctrl.data.dropdown.accessTypes[0].key,
			media: type,
			telephoneNumber: (type === 'Phone') ? '' : null,
			url: (type === 'Email') ? '' : null,
			notes: null,
			effectiveDate: ctrl.data.contacts[0].effectiveDate,
			actualAccessType: null,
			accessTypeObj: ctrl.data.dropdown.accessTypes[0]
		}
	};

	ctrl.$onInit = function () {
		ctrl.data = ProfileDataService.getForm();
		ctrl.data.primaryNames = ctrl.data.names.names.priNamesActiveList[0];
		ctrl.data.preferredNames = ctrl.data.names.names.prfNamesCurrentList[0];
		ctrl.data.contacts = ctrl.data.contacts.contacts;
		ctrl.data.contacts.filter(function (obj, index) {
			ctrl.data.dropdown.accessTypes.filter(function (input, index) {
				if (input.key === obj.accessType) {
					obj.accessTypeObj = {
						"key": obj.accessType,
						"value": input.value
					};
				}
			});
		});
	};

	ctrl.setvalue = function(type, value){
		return type === 'Email' ? ctrl.isFirstPhone += value : ctrl.isFirstEmail += value;
	};
	ctrl.removeContact = function (index) {
		ctrl.data.contacts.splice(index, 1);
	};

	ctrl.addNewEmailField = function () {
		ctrl.data.contacts.push(ctrl._createObject('Email'));
	};

	ctrl.addNewPhoneField = function () {
		if (ctrl.data.dropdown.accessTypes.length >= ctrl.data.contacts.length) {
			ctrl.data.contacts.push(ctrl._createObject('Phone'));
		}
	};

	ctrl.saveNameContactSection = function (formName) {
		if (formName.$valid) {
			ctrl.data.successMessage = ProfileDataService.saveNameContacts(ctrl.data);
		} else {
			alert('please fill out the fields....');
		}
	}
}
