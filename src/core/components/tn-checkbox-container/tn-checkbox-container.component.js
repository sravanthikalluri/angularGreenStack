'use strict';

require('./tn-checkbox-container.component.scss');

module.exports = {
	template: require('./tn-checkbox-container.component.html'),
	transclude: true,
	controller: TnCheckboxContainerController
};

function TnCheckboxContainerController() {
	var ctrl = this;
}
