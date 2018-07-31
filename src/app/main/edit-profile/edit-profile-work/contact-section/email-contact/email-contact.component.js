'use strict';

require('./email-contact.component.scss');

module.exports = {
	template: require('./email-contact.component.html'),
	controller: EmailContactController,
	bindings: {
		email: '<',
		data: '<',
		formName: '<',
		isFirst: '<',
		onUpdate: '&',
		onDelete: '&',
		emailId: '<',
		isFocus: '<'
	}
};

function EmailContactController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.keys = {
			emailType    : 'accessType',
			emailAddress : 'url'
		};

		ctrl.selected = {
			accessType: ctrl.data && ctrl.data.dropdown && ctrl.data.dropdown.accessTypes && ctrl.data.dropdown.accessTypes.filter(function(d) { return d.key === ctrl.email.accessType; })[0]
		};
	};

	ctrl.update = function(prop, value) {
		ctrl.onUpdate({ email: ctrl.email, prop: prop, value: value });
	};

	ctrl.delete = function() {
		ctrl.onDelete({ email: ctrl.email });
	};
}
