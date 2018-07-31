'use strict';

require('./primary-name-section.component.scss');

module.exports = {
	template: require('./primary-name-section.component.html'),
	controller: PrimaryNameSectionController,
	bindings: {
		formName: '<',
		data: '<',
		onUpdate: '&',
		primarychanged: '='
	}
};

function PrimaryNameSectionController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.keys = {
			formOfAddress : 'formOfAddress',
			firstName     : 'firstName',
			middleName    : 'middleName',
			lastName      : 'lastName',
			suffix        : 'suffix'
		};
	};

	ctrl.update = function(prop, value) {
		ctrl.primarychanged=true;
		ctrl.onUpdate({ prop: prop, value: value });
	};
}
