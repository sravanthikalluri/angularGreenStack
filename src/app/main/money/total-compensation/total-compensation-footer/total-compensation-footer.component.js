'use strict';

require('./total-compensation-footer.component.scss');

module.exports = {
	template: require('./total-compensation-footer.component.html'),
	controller: TotalCompensationFooterController
};

function TotalCompensationFooterController() {
	var ctrl = this;

	ctrl.$onInit = function() {

	};
}
