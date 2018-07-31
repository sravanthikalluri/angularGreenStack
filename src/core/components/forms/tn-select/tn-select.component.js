'use strict';

require('./tn-select.component.scss');

module.exports = {
	template: require('./tn-select.component.html'),
	controller: ['$filter',TnSelectController],
	bindings: {
		label: '@',
		labelAria: '@',
		placeholder: '@',
		fieldName: '@',
		formName: '<',
		fieldValue: '=',
		items: '<',
		isRequired: '<',
		isDisabled: '<',
		isHide: '<',
		onUpdate: '&',
		stringLimit: '<',
		componentId: '<',
		isFocus: '<'
	}
};

/* @ngInject */
function TnSelectController($filter) {
	var ctrl = this;
	ctrl.itemsEllipsed = null;
	ctrl.dynamicItems = null;
	ctrl.itemsFull = null;
	ctrl.$onInit = function() {
		ctrl.fieldValueCopy = angular.copy(ctrl.fieldValue);

		ctrl.itemsEllipsed = ctrl.items && ctrl.items.map(function (i) {
			if (ctrl.stringLimit && i.value.length > ctrl.stringLimit) {
				return {
					value: $filter('ellipsize')(i.value, ctrl.stringLimit),
					key: i.key
				}
			}
			else {
				return i;
			}
		});
		ctrl.dynamicItems = ctrl.itemsEllipsed;
	};

	ctrl.setFullSelectOptions = function() {
		ctrl.dynamicItems = ctrl.items;
	};

	ctrl.setEllipsedSelectOptions = function() {
		ctrl.dynamicItems = ctrl.itemsEllipsed;
	};

	ctrl.$postLink = function() {
		ctrl.input = ctrl.formName[ctrl.fieldName];
	};

	ctrl.update = function(data) {
		ctrl.onUpdate({ data: data });
	};
}
