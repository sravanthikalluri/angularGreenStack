'use strict';


module.exports = {
	template: require('./ale-no-selection.component.html'),
	controller: aleYesSelectionController,
	bindings:{
		yesActive: '=',
		showSection:'=',
		submit : '&'
	}
};

function aleYesSelectionController() {
	var ctrl = this;
	ctrl.termsAndConditions = false;
}
