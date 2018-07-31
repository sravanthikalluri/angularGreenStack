'use strict';

require('./contact-section.component.scss');

module.exports = {
	template: require('./contact-section.component.html'),
	controller: ['$timeout', '$filter', 'emailTypesTemplate', 'phoneTypesTemplate', ContactSectionController],
	bindings: {
		formName: '<',
		data: '<',
		onAdd: '&',
		onUpdate: '&',
		onDelete: '&'
	}
};

function ContactSectionController($timeout, $filter, emailTypesTemplate, phoneTypesTemplate) {
	var ctrl = this;
	ctrl.isFocusEmail = false;
	ctrl.isFocusPhone = false;
	ctrl.isEmail = false;
	ctrl.isPhone = false;
	ctrl.emailContacts = emailTypesTemplate;

	ctrl.phoneContacts = phoneTypesTemplate;

	ctrl.$onInit = function () {
		$timeout(function () {
			ctrl.formName.$setPristine();
		}, 1000);
	};

	ctrl.add = function(type) {
		if (type === 'Email') {
			ctrl.isFocusEmail = true;
			ctrl.isEmail = true;
			ctrl.messageForEmail = $filter('translate')("emailAddedMessage");
		} else {
			ctrl.isFocusPhone = true;
			ctrl.isPhone = true;
			ctrl.messageForPhone = $filter('translate')("phoneAddedMessage");
		}

		ctrl.onAdd({ type: type });
	};

	ctrl.update = function(contact, prop, value, type) {
		ctrl.onUpdate({ contact: contact, prop: prop, value: value, type: type });
	};

	ctrl.delete = function(contact) {
		ctrl.onDelete({ contact: contact, formName: ctrl.formName });
	};
}
