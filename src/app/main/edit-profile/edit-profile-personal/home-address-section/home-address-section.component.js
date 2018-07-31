'use strict';

require('./home-address-section.component.scss');

module.exports = {
	templateUrl: 'app/main/edit-profile/edit-profile-personal/home-address-section/home-address-section.component.html',
	controller: ['moment', 'constants', '$uibModal', HomeAddressSectionController],
	bindings: {
		data: '<',
		formName: '<',
		onUpdate: '&',
		onDelete: '&'
	}
};

function HomeAddressSectionController(moment, constants, $uibModal) {
	var ctrl = this;
	var addressListCopy;
	ctrl.data.deletedAddresses = [];
	ctrl.displayFutureMessage = false;
	ctrl.futureMessage = "Future Change Pending";
	ctrl.chipStyle = {'background' :'#4b7297'};
	ctrl.$onInit = function() {
		ctrl.keys = {
			effectiveDate: 'effectiveDate',
			address1   : 'address1',
			address2   : 'address2',
			city       : 'city',
			county      :'county',
			state      : 'state',
			postalCode : 'postalCode',
			country    : 'country'
		};
		addressListCopy = angular.copy(ctrl.data);
		ctrl.data.address = ctrl.data.address[0];
		ctrl.data.address.effectiveDate = moment().format('MM/DD/YYYY');
		ctrl.maxDate = moment().add(60,'days').format('MM/DD/YYYY');
		ctrl.minDate = moment().subtract(30, 'days').format('MM/DD/YYYY');

		ctrl.dateMenuObject = [];
		ctrl.data.selectedEffectiveDate = constants.currentlyEffective;
		angular.forEach(addressListCopy.address,function(address, index){
			if(index === 0){
				ctrl.dateMenuObject.push(constants.currentlyEffective);
			}else{
				ctrl.dateMenuObject.push(constants.effective+''+ moment(address.effectiveDate, "YYYY-MM-DD").format('MM/DD/YYYY'));
			}
		});
		if(ctrl.dateMenuObject.length > 1){
			ctrl.displayFutureMessage = true;
		}
	};

	ctrl.update = function(prop, value) {
		if (prop === 'effectiveDate') {
			ctrl.formName.$dirty = true;
		}
		ctrl.onUpdate({ prop: prop, value: value });
	};

	ctrl.changeAddressInfoDate = function (selectedEffectiveDate, address) {
		var index = ctrl.dateMenuObject.indexOf(selectedEffectiveDate);
		if(index >= ctrl.dateMenuObject.length-1){
			ctrl.displayFutureMessage = false;
		}else{
			ctrl.displayFutureMessage = true;
		}
		ctrl.data.address = addressListCopy.address[index];
		ctrl.data.address.effectiveDate = moment(ctrl.data.address.effectiveDate).format('MM/DD/YYYY');
		if (selectedEffectiveDate === 'Currently Effective') {
			ctrl.data.address.effectiveDate = moment().format('MM/DD/YYYY');
		}
		if (ctrl.data.address.country === 'US') {
			ctrl.data.selected.state = ctrl.data.dropdown.usStates.filter(function(d) { return d.key === ctrl.data.address.state; })[0];
		} else {
			ctrl.data.selected.province = ctrl.data.dropdown.caProvinces.filter(function(d) { return d.key === ctrl.data.address.state; })[0];
		}

	};

	ctrl.prompt = function() {
		ctrl.confirmData = {};
		ctrl.confirmData.messsage = 'Do you really want to delete this future dated address set for '+ctrl.deleteSelectedEffective+'?';
		ctrl.confirmData.yesButton = 'yes-delete';
		ctrl.confirmData.noButton = 'cancel';
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

	ctrl.deleteAddress = function (addressInfo, selectedEffectiveDate) {
		ctrl.deleteSelectedEffective = selectedEffectiveDate;
		ctrl.prompt()
			.then(function() {
				var index = ctrl.dateMenuObject.indexOf(selectedEffectiveDate);
				ctrl.dateMenuObject.splice(index, 1);
				ctrl.data.selectedEffectiveDate = constants.currentlyEffective;
				ctrl.data.address = addressListCopy.address[0];
				ctrl.data.deletedAddresses.push(addressInfo);
				ctrl.onDelete();
			})
			.catch(function() {});

		// ctrl.data.address.effectiveDate = ctrl.data.address.effectiveDate.indexOf('/') !== -1 ? moment(ctrl.data.address.effectiveDate, "MM-DD-YYYY").format('YYYY-MM-DD') : moment(ctrl.data.address.effectiveDate, "YYYY-MM-DD").format('YYYY-MM-DD');
	}
}
