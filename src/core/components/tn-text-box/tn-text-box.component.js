'use strict';

require('./tn-text-box.component.scss');

module.exports = {
	template: require('./tn-text-box.component.html'),
	controller: TnTextBoxController,
	bindings:{
		value: '=',
		style: '=',
		type: '='
	}
};

function TnTextBoxController(){
	var ctrl = this;

	ctrl.$onInit = function() {
	}
}
