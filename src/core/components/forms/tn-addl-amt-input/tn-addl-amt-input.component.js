'use strict';

require('./tn-addl-amt-input.component.scss');

module.exports = {
	template: require('./tn-addl-amt-input.component.html'),
	controller: TnAddlAmtInputController,
	bindings: {
		label: '@',
		labelAria:'@',
		fieldName: '@',
		formName: '<',
		fieldValue: '=',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&'
	}
};

function TnAddlAmtInputController() {
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
