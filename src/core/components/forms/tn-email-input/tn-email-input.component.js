'use strict';

require('./tn-email-input.component.scss');

module.exports = {
	template: require('./tn-email-input.component.html'),
	controller: TnEmailInputController,
	bindings: {
		label: '@',
		formName: '<',
		fieldName: '@',
		componentId: '<',
		fieldValue: '<',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&'
	}
};

function TnEmailInputController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.fieldValueCopy = angular.copy(ctrl.fieldValue);
	};

	ctrl.$postLink = function() {
		ctrl.input = ctrl.formName[ctrl.fieldName];
	};

	ctrl.update = function(data) {
		ctrl.onUpdate({ data: data });
	};
}
