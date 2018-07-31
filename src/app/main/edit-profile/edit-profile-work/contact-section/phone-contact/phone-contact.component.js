'use strict';

require('./phone-contact.component.scss');

module.exports = {
	template: require('./phone-contact.component.html'),
	controller: PhoneContactController,
	bindings: {
		phone: '<',
		data: '<',
		formName: '<',
		isFirst: '<',
		onUpdate: '&',
		onDelete: '&',
		phoneId: '<',
		isFocus: '<'
	}
};

function PhoneContactController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.keys = {
			phoneType   : 'accessType,media',
			phoneNumber : 'telephoneNumber'
		};

		ctrl.selected = {
			accessType: ctrl.data.dropdown.accessTypes.filter(function(d) { return (d.accessType === ctrl.phone.accessType && d.media === ctrl.phone.media); })[0]
		};
	};

	ctrl.update = function(prop, value, type) {
		ctrl.onUpdate({ phone: ctrl.phone, prop: prop, value: value, type: type});
	};

	ctrl.delete = function() {
		ctrl.onDelete({ phone: ctrl.phone });
	};
}
