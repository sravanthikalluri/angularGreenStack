'use strict';

require('./tn-postal-input.component.scss');

module.exports = {
	template: require('./tn-postal-input.component.html'),
	controller: TnPostalInputController,
	bindings: {
		label: '@',
		fieldName: '@',
		formName: '<',
		fieldValue: '=',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&',
		componentId: '<'
	}
};

function TnPostalInputController() {
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
