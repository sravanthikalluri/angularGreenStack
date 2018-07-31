'use strict';

require('./benefits-guide-book.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-guide-book/benefits-guide-book.component.html',
	controller: ['DS','$stateParams',BenefitsGuideBook],
	bindings: {
		isChecked : '<'
	}
};
/* @ngInject */
function BenefitsGuideBook(DS,$stateParams) {
	var ctrl = this;
	if($stateParams.data){
		ctrl.showNavigation = $stateParams.data;
	}
	ctrl.error = null;
	ctrl.showSpinner = true;
	ctrl.$onInit = function() {
		DS.find('benefits-guide-book','').then(function(response) {
			ctrl.response = response;
			ctrl.benefitGuideBookPdfData = response.benefitsGuideBook;
			ctrl.message = ctrl.benefitGuideBookPdfData.message;
			ctrl.showSpinner = false;
			/*if user is not Canadian*/
			if (ctrl.benefitGuideBookPdfData.canadian === false) {
				ctrl.nonCandianPdfData = ctrl.benefitGuideBookPdfData.guideBookDesc;
				ctrl.hidecandian = true;
			}/*if user is Canadian*/
			else {
				ctrl.candianPdfData = ctrl.benefitGuideBookPdfData.guideBookDesc;
			}
		}).catch(function(err) {
			ctrl.error = err;
			ctrl.errorMessage = err.data._error.message;
			ctrl.showSpinner = false;
		});
	};
}
