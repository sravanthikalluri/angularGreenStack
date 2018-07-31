'use strict';

require('./plan-comparison.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/plan-comparison/plan-comparison.component.html',
	controller: ['DS',PlanComparisonController],
	bindings : {
		data:'<'
	}
};
/* @ngInject */
function PlanComparisonController(DS) {
	var ctrl = this;
	ctrl.$onInit=function(){

	}
	ctrl.getPdfLink = function (num) {
		return new Array(num);
	};
}
