'use strict';

require('./tn-address-input.component.scss');

module.exports = {
	template: require('./tn-address-input.component.html'),
	controller: TnAddressInputController,
	bindings: {
		label: '@',
		fieldName: '@',
		componentId: '<',
		formName: '<',
		fieldValue: '=',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&'
	}
};

function TnAddressInputController() {
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
