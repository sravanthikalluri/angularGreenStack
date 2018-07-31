'use strict';

require('./edit-profile-personal.component.scss');

module.exports = {
	template: require('./edit-profile-personal.component.html'),
	controller: ['$state', 'editProfilePersonal','DS', 'gso','$uibModal','$location', EditProfilePersonalController]
};

/* @ngInject */
function EditProfilePersonalController($state, editProfilePersonal,DS, gso,$uibModal, $location) {
	var ctrl = this;

	ctrl.$onInit = function() {
		editProfilePersonal
			.fetch()
			.then(function(result) {
				ctrl.data = result;
				ctrl.data.countryName = gso.getAppConfig().countryCode;
			})
			.catch(function(err) { console.log(err); });
	};

	ctrl.handleCountryChange = function(country) {
		ctrl.data.address.postalCode = null;
		ctrl.data.address.state = null;
		ctrl.data.selected.state = null;
		ctrl.data.selected.province = null;

		DS.find('states', country + '/states').then(function (statesRes) {
			if (country === 'US') {
				ctrl.data.dropdown.usStates = statesRes.states;
			} else if (country === 'CA') {
				ctrl.data.dropdown.caProvinces = statesRes.states;
			}
		})
	};

	ctrl.updateAddress = function(prop, value) {
		if (prop === 'country') {
			ctrl.handleCountryChange(value);
		}

		ctrl.data.address[prop] = value;
	};

	ctrl.updatePersonalId = function(prop, value) {
		ctrl.data.personalInfo[prop] = value;
	};

	ctrl.updatePersonalStatus = function(prop, value) {
		ctrl.data.personalInfo[prop] = value;
	};

	ctrl.cancel = function(editProfilePersonalForm) {
		if(editProfilePersonalForm.homeAddressSectionForm.$dirty || editProfilePersonalForm.personalIdSectionForm.$dirty || editProfilePersonalForm.personalstatusSectionForm.$dirty){
			ctrl.prompt()
				.then(function() {
					ctrl.goToView();
				})
				.catch(function() {});
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
	}
	ctrl.goToView = function(){
		$state.go('app.main.profile');
	};

	ctrl.save = function(form) {
		ctrl.showFullSpinner = true;

		if(form.homeAddressSectionForm.$invalid || form.personalIdSectionForm.$invalid || form.personalstatusSectionForm.$invalid){
			ctrl.showFullSpinner = false;
			return;
		}

		editProfilePersonal
			.save(ctrl.data, form, ctrl)
			.then(function() {
				var success = {
                	_statusCode: '200',
                	_statusMessage: 'Changes saved successfully'
                };
                $state.go('app.main.profile',{response: success});
			})
			.catch(function(err) {
				ctrl.showFullSpinner = false;
				ctrl.err = err.data;
			});
	};

	ctrl.delete = function(form) {
		ctrl.showFullSpinner = true;

		if(form.homeAddressSectionForm.$invalid){
			ctrl.showFullSpinner = false;
			return;
		}

		editProfilePersonal
			.delete(ctrl.data, form)
			.then(function() {
				var success = {
                	_statusCode: '200',
                	_statusMessage: 'Changes saved successfully'
                };
				$location.path('/app/main/profile');
			})
			.catch(function(err) {
				ctrl.showFullSpinner = false;
				ctrl.err = err.data;
			});
	};
}
