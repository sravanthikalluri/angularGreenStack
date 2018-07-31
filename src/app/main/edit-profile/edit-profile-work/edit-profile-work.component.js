'use strict';

require('./edit-profile-work.component.scss');

module.exports = {
	template: require('./edit-profile-work.component.html'),
	controller: ['$state', 'editProfileWork', 'moment', 'nameTemplate', 'contactTemplate','gso','$uibModal',EditProfileWorkController]
};

/* @ngInject */
function EditProfileWorkController($state, editProfileWork, moment, nameTemplate, contactTemplate,gso,$uibModal) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.primarychanged = false;
		ctrl.profilePicture = gso.getAppConfig().profilePicture;
		ctrl.mimeType = gso.getAppConfig().mimeType;
		editProfileWork
			.fetch()
			.then(function(result) { ctrl.data = result; })
			.catch(function(err) { console.log(err); });
	};

	ctrl.updatePrimaryName = function(prop, value) {
		ctrl.data.primary[prop] = value;
	};

	ctrl.updatePreferredName = function(prop, value) {
		if (!ctrl.data.preferred) {
			ctrl.data.preferred = angular.extend({}, nameTemplate, {
				employeeId    : ctrl.data.primary.employeeId,
				effectiveDate : moment().format('YYYY-MM-DD'),
				nameType      : 'PRF'
			});
		};

		ctrl.data.preferred[prop] = value;
	};

	ctrl.addContact = function(type) {
		var contact = angular.extend({}, contactTemplate, {
			id            : Math.random() * 1000,
			employeeId    : ctrl.data.primary.employeeId,
			effectiveDate : moment().format('YYYY-MM-DD'),
			media         : type
		});

		ctrl.data.contacts.push(contact);
	};

	ctrl.updateContact = function(contact, prop, value, type) {
		if (!value) {
			return;
		}

		if (prop.split(',').length === 2) {
			var arr = prop.split(',');
			contact[arr[0]] = value[arr[0]];
			contact[arr[1]] = value[arr[1]];
		} else {
			contact[prop] = value;
		}

	};

	ctrl.deleteContact = function(contact, formName) {
		var idx = ctrl.data.contacts.indexOf(contact);

		if (idx >= 0) {
			ctrl.data.contacts.splice(idx, 1);
			formName.$dirty = true;
		}
	};

	ctrl.cancelPopup = function(editProfileWorkForm) {
		if(editProfileWorkForm.primaryNameSectionForm.$dirty || editProfileWorkForm.preferredNameSectionForm.$dirty  || editProfileWorkForm.contactSectionForm.$dirty ){
			ctrl.prompt().then(function() {
				ctrl.goToView();
			}).catch(function() {});
		}else{
			ctrl.goToView();
		}


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
	};
	ctrl.goToView = function(){
		$state.go('app.main.profile');
	};


	ctrl.save = function(form) {
		ctrl.showFullSpinner = true;

		if(form.primaryNameSectionForm.$invalid || form.preferredNameSectionForm.$invalid || form.contactSectionForm.$invalid){
			ctrl.showFullSpinner = false;
			return;
		}

		editProfileWork
			.save(ctrl.data, form)
			.then(function() {
			var success = {
                	_statusCode: '200',
                	_statusMessage: 'Changes saved successfully'
                };
			$state.go('app.main.profile',{response: success});
			})
			.catch(function(err) { ctrl.err = err.data; ctrl.showFullSpinner = false;});
	};
}
