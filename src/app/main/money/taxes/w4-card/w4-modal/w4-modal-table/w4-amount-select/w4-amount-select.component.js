'use strict';

require('./w4-amount-select.component.scss');

module.exports = {
	template: require('./w4-amount-select.component.html'),
	controller: W4AmountSelectController,
	bindings: {
		formName: '<',
		fieldName: '<',
		fieldValue: '<',
		items: '<',
		onUpdate: '&',
		label: '@',
		disabled:'<'
	}
};

function W4AmountSelectController() {
	var ctrl = this;
ctrl.$onInit=function(){

}
	ctrl.update = function(data) {
		ctrl.onUpdate({ data: data });
	};
}
