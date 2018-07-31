'use strict';

require('./edit-profile-emergency.component.scss');

module.exports = {
	templateUrl: 'app/main/edit-profile/edit-profile-emergency/edit-profile-emergency.component.html',
	controller: ['$state', 'editProfileEmergency', 'emergencyContactTemplate', 'gso','$rootScope', '$uibModal', 'DS',EditProfileEmergencyController]
};

/* @ngInject */
function EditProfileEmergencyController($state, editProfileEmergency, emergencyContactTemplate, gso, $rootScope, $uibModal, DS) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.data = undefined;

		editProfileEmergency
			.fetch()
			.then(function(result) {
				$rootScope.$emit("onboardingUpdateTask", {taskId: "EMERGENCY_CONTACT"});				
				ctrl.data = result;
				ctrl.data.emergencyContacts.filter(function (contact, index) {
					contact.isDisabled = true;
					contact.telephoneNumbers.telephoneNumber1 = contact.telephoneNumbers.telephoneNumber1 ? contact.telephoneNumbers.telephoneNumber1.replace(/[^\d]+/gi, "-") : '';
				});
			})
			.catch(function(err) {
				console.log(err);
				if (err.status === 404) {
					ctrl.data = editProfileEmergency._create();
				}
			});
	};
	ctrl.setPrimaryContact = function(newPrimary, value) {
		var oldPrimary;

		if (value === 'Y') {
			oldPrimary = ctrl.data.emergencyContacts.filter(function(primary) {
				return primary.primaryContactFlag === 'Y' && primary !== newPrimary;
			})[0];

			oldPrimary ?  oldPrimary.primaryContactFlag = 'N' : angular.noop();
		} else {
			// User shouldn't be able to uncheck a primary contact
			newPrimary.primaryContactFlag = 'Y';
		}
	};

	ctrl.updateContact = function(contact, prop, value, key) {
		if (!value && value !== '') {
			return;
		}

		// Handle primaryContactFlag
		if (prop === 'primaryContactFlag') {
			ctrl.setPrimaryContact(contact, value);
			return;
		}

		// Handle nested properties
		if (key) {
			contact[key][prop] = value;
		} else {
			contact[prop] = value;
		}
	};

	ctrl.addContact = function() {
		var id = Math.random() * 1000 + '-NEW';
		var contact = angular.merge({}, emergencyContactTemplate, {
			id       : id,
			uniqueId : id,
			isDisabled: false,
			employeeId: gso.getAppConfig().userId
		});

		ctrl.data.emergencyContacts.push(contact);
	};

	ctrl.deleteContact = function(contact) {
		var idx = ctrl.data.emergencyContacts.indexOf(contact);
		var deleted;

		if (idx >= 0) {
			deleted = ctrl.data.emergencyContacts.splice(idx, 1)[0];

			// Save these non-NEW deleted contacts for later
			if (deleted.uniqueId.toString().indexOf('NEW') === -1) {
				ctrl.data.deletedContacts.push(deleted);
			}
		}
	};



	ctrl.save = function(form) {
		ctrl.data = editProfileEmergency._adjust(ctrl.data);
		ctrl.showFullSpinner = true;
		if (form.$invalid) {
			ctrl.showFullSpinner = false;
			return;
		}


		var primaryEmergContact = ctrl.data.emergencyContacts.filter(function (contact, index) {
			if (contact.primaryContactFlag === 'Y') {
				ctrl.data.emergencyContacts.splice(index, 1);
				return contact;
			}
		});

		function navigateToProfileView(result) {
			ctrl.showFullSpinner = false;
			$state.go('app.main.profile', {response: result.data});
		}

		if(primaryEmergContact.length === 0){
			var alertError = {
				_statusCode: '400',
				_statusMessage: 'There must be at least one primary contact'
			};
			ctrl.err = alertError;
			ctrl.showFullSpinner = false;
			return;
		}

		if (!form.emergencyContactFormSection.$dirty && ctrl.data.deletedContacts.length) {
			editProfileEmergency.delete(ctrl.data).then(function() {
				var success = {
					data: {
						_statusCode: '200',
						_statusMessage: 'Emergency contact deleted successfully'
					}
				};
				navigateToProfileView(success);
				return DS.ejectAll('emergencyContacts');
			}).catch(function (err) { ctrl.showFullSpinner = false; });
		} else {
			if (!primaryEmergContact[0].uniqueId) {
				delete  primaryEmergContact[0].name.firstName;
				delete  primaryEmergContact[0].name.middleName;
				delete  primaryEmergContact[0].name.lastName;
				DS.create('emergencyContacts', primaryEmergContact[0]).then(function (res) {
					$rootScope.$emit("onboardingUpdateTask", {taskId: "EMERGENCY_CONTACT"});				
					if (ctrl.data.emergencyContacts.length) {
						executeEmergencyContacts();
					} else {
						editProfileEmergency.delete(ctrl.data).then(function() {
							navigateToProfileView(res);
							return DS.ejectAll('emergencyContacts');
						});
					}
				}).catch(function (err) { ctrl.showFullSpinner = false; });
			} else {
				delete  primaryEmergContact[0].name.firstName;
				delete  primaryEmergContact[0].name.middleName;
				delete  primaryEmergContact[0].name.lastName;
				DS.update('emergencyContacts', '', primaryEmergContact[0]).then(function (res) {
					if (ctrl.data.emergencyContacts.length) {
						executeEmergencyContacts();
					} else {
						editProfileEmergency.delete(ctrl.data).then(function() {
							navigateToProfileView(res);
							return DS.ejectAll('emergencyContacts');
						});
					}
				}).catch(function (err) { ctrl.showFullSpinner = false; })
			}
		}

	};

	function executeEmergencyContacts() {
		editProfileEmergency
			.save(ctrl.data)
			.then(function(result) {				
				$state.go('app.main.profile', {response: result[result.length - 1].data});
			})
			.catch(function(err) {
				ctrl.showFullSpinner = false;
				ctrl.err = err.data;
			});
	}

	ctrl.cancel = function(emergencyContactForm) {
		if(emergencyContactForm.emergencyContactFormSection.$dirty){
			ctrl.prompt()
				.then(function() {
					ctrl.goToView();
				})
				.catch(function() {});
		}else{
			ctrl.goToView();
		}

	};
	ctrl.goToView = function(){
		$state.go('app.main.profile');
	};
	ctrl.prompt = function() {
			ctrl.confirmData = {};
			ctrl.confirmData.messsage = 'If you continue, any unsaved changes will be discarded. Do you want to continue?';
			ctrl.confirmData.yesButton = 'Yes, discard changes';
			ctrl.confirmData.noButton = 'No';
			var modal = $uibModal.open({
				template  : '<tn-confirmation-modal></tn-confirmation-modal>',
				component : 'tnConfirmationModal',
				windowClass : 'edit-profile-confirm',
				resolve   : {
					data: function() { return angular.merge({}, ctrl.confirmData); }
				}
			});
			return modal.result;
		}


}
