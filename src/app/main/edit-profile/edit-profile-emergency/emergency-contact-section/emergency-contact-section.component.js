'use strict';

module.exports = {
	template: require('./emergency-contact-section.component.html'),
	controller: ['$timeout',EmergencyContactSectionController],
	bindings: {
		contact: '<',
		formName: '<',
		data: '<',
		isDisabled: '<',
		onUpdate: '&',
		onDelete: '&'
	}
};

function EmergencyContactSectionController($timeout) {
	var ctrl = this;

	ctrl.$onInit = function() {
		$timeout(function () {
			ctrl.formName.$setPristine();
		}, 1000);
		ctrl.keys = {
			contactName    : 'lastName',
			relationship   : 'contactRelationship',
			phone          : 'telephoneNumber1',
			phone2         : 'telephoneNumber2',
			phone3         : 'telephoneNumber3',
			phone4         : 'telephoneNumber4',
			email          : 'email',
			address1       : 'address1',
			address2       : 'address2',
			city           : 'city',
			state          : 'state',
			postalCode     : 'postalCode',
			country        : 'country',
			sameAddress    : 'sameAddressPerson',
			primaryContact : 'primaryContactFlag',
			notes		   : 'notes'
		};

		ctrl.selected = {
			relationship: ctrl.data.dropdown.relationships.filter(function(d) { return d.key === ctrl.contact.contactRelationship; })[0],
			state: ctrl.data.dropdown.usStates.filter(function(d) { return d.key === ctrl.contact.address.state; })[0],
			province: ctrl.data.dropdown.caProvinces.filter(function(d) { return d.key === ctrl.contact.address.state; })[0],
			country: ctrl.data.dropdown.countries.filter(function(d) { return d.key === (ctrl.contact.address.country || 'US'); })[0]
		};

		ctrl.email = { text: 'field.not.used@trinet.com' };
	};

	ctrl.handleCountryChange = function() {
		ctrl.contact.address.postalCode = null;
		ctrl.contact.address.state = null;
		ctrl.selected.state = null;
		ctrl.selected.province = null;
	};

	ctrl.update = function(prop, value, key) {
		if (!value && value !== '') {
			return;
		}

		if (prop === 'country') {
			ctrl.handleCountryChange();
		}

		ctrl.onUpdate({
			contact : ctrl.contact,
			prop    : prop,
			value   : value,
			key     : key
		});
	};

	ctrl.delete = function() {
		ctrl.onDelete({ contact: ctrl.contact });
	};

	// Following 2 methods Should be in parent controller ... will re-factor later
	ctrl.checkAddress = function() {
		if (ctrl.contact.sameAddressPerson === 'Y') {
			ctrl.contact.address = angular.copy(ctrl.data.homeAddress);
			ctrl.selected.state = ctrl.data.dropdown.usStates.filter(function(d) { return d.key === ctrl.contact.address.state; })[0];
			ctrl.selected.province = ctrl.data.dropdown.caProvinces.filter(function(d) { return d.key === ctrl.contact.address.state; })[0];
			ctrl.selected.country = ctrl.data.dropdown.countries.filter(function(d) { return d.key === ctrl.contact.address.country; })[0];
		}
	};
}
