'use strict';

require('./summary-of-medical-plan-changes.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/summary-of-medical-plan-changes/summary-of-medical-plan-changes.component.html',
	controller: ['DS',SummaryOfMedicalPlanChangesController],
	bindings : {
		data:'<'
	}
};
/* @ngInject */
function SummaryOfMedicalPlanChangesController(DS) {
	var ctrl = this;
	ctrl.$onInit=function(){

	}
}
