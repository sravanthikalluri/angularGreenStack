'use strict';

require('./life-and-disability-coverage.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/life-and-disability-coverage/life-and-disability-coverage.component.html',
	bindings:{
		benefitResPdfLinks: '<'
	},
	controller: LifeAndDisabilityCoverageController
};
/* @ngInject */
function LifeAndDisabilityCoverageController(){
	var ctrl = this;
	ctrl.$onInit=function(){
		console.log(ctrl.benefitResPdfLinks);
	}
}
