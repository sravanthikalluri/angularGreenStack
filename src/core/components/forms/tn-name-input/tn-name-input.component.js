'use strict';

require('./tn-name-input.component.scss');

module.exports = {
	template: require('./tn-name-input.component.html'),
	controller: TnNameInputController,
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

function TnNameInputController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.fieldValueCopy = angular.copy(ctrl.fieldValue);
		ctrl.maxLength = (ctrl.fieldName == 'citizenship') ? 50 : 30;
	};

	ctrl.$postLink = function() {
		ctrl.input = ctrl.formName[ctrl.fieldName];
	};

	ctrl.update = function(data) {
		ctrl.onUpdate({ data: data });
	};
}
