'use strict';

require('./tn-city-input.component.scss');

module.exports = {
	template: require('./tn-city-input.component.html'),
	controller: TnCityInputController,
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

function TnCityInputController() {
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
