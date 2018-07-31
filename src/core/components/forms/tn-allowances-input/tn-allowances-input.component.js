'use strict';

require('./tn-allowances-input.component.scss');

module.exports = {
	template: require('./tn-allowances-input.component.html'),
	controller: TnAllowancesInputController,
	bindings: {
		label: '@',
		labelAria: '@',
		fieldName: '@',
		formName: '<',
		fieldValue: '=',
		maxValue: '<',
		isRequired: '<',
		isDisabled: '<',
		onUpdate: '&'
	}
};

function TnAllowancesInputController() {
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
