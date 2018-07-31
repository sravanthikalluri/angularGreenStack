'use strict';

require('./tn-search-box.component.scss');

module.exports = {
	template: require('./tn-search-box.component.html'),
	controller: TnSearchBoxController,
	bindings: {
		placeholder: '@',
		search: '<',
		action: '&'
	}
};


function TnSearchBoxController() {
	var ctrl = this;

	ctrl.change = function(){
		ctrl.action();
	}
}

