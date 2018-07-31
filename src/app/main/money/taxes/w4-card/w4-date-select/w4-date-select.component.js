'use strict';

require('./w4-date-select.component.scss');

module.exports = {
	template: require('./w4-date-select.component.html'),
	controller: ['$filter',W4DateSelectController],
	bindings: {
		items: '<',
		selectedItem: '<',
		onUpdate: '&'
	}
};

/* @ngInject */
function W4DateSelectController($filter) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.selected = { item: ctrl.selectedItem };
	};

	ctrl.update = function(item) {
		ctrl.onUpdate({ item: item });
	};

	ctrl.format = function(dateString) {
		return $filter('effectiveDate')(dateString);
	};
}
