'use strict';

require('./total-compensation.component.scss');

module.exports = {
	templateUrl: 'app/main/money/total-compensation/total-compensation.component.html',
	controller: TotalCompensationController
};

/* @ngInject */
function TotalCompensationController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.colors = ['#6FBB4C','rgb(83,166,94)','#EEAE40'];
		ctrl.amounts = [37000,3000,15000];
	};

}
