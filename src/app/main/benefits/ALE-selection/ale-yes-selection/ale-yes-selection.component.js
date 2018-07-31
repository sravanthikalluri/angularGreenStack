'use strict';


module.exports = {
	template: require('./ale-yes-selection.component.html'),
	controller: aleYesSelectionController,
	bindings:{
		yesActive: '=',
		showSection:'=',
		finalSection:'=',
		submit: '&'
	}
};

function aleYesSelectionController() {
	var ctrl = this;
}
