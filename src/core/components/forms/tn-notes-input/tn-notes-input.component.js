'use strict';

require('./tn-notes-input.component.scss');

module.exports = {
	template: require('./tn-notes-input.component.html'),
	controller: TnNotesInputController,
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

function TnNotesInputController() {
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
