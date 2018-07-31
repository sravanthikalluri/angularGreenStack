'use strict';

require('./tn-phone-input.component.scss');

module.exports = {
	template: require('./tn-phone-input.component.html'),
	controller: TnPhoneInputController,
	bindings: {
		label: '@',
		fieldName: '@',
		formName: '<',
		fieldValue: '<',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&',
		componentId: '<'
	}
};

function TnPhoneInputController() {
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
