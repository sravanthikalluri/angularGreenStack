'use strict';

require('./tn-annual-exemption-amt-input.component.scss');

module.exports = {
	template: require('./tn-annual-exemption-amt-input.component.html'),
	controller: TnAnnulaExemptionInputController,
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

function TnAnnulaExemptionInputController() {
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
