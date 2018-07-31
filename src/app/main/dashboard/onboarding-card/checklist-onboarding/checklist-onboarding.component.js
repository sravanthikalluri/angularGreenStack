'use strict';

require('../onboarding-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/onboarding-card/checklist-onboarding/checklist-onboarding.component.html',
	controller: ['DS',ChecklistOnboardingController],
	bindings:{
		data : '<',
		displayStep: '<',
		isCanadian: '<',
		isTa:'<'
	}
}

/* @ngInject */
function ChecklistOnboardingController(DS) {
	var ctrl = this;
}
