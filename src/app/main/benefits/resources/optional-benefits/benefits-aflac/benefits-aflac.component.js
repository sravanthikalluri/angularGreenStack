'use strict';

require('./benefits-aflac.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/optional-benefits/benefits-aflac/benefits-aflac.component.html',
	controller: ['DS','$location','gso',BenefitsAflacController],
	bindings: {
		resolve: '<',
		modalInstance: '<',
		index: '<'
	}
};
/* @ngInject */
function BenefitsAflacController(DS,$location,gso) {
	var ctrl = this;
	ctrl.indexId = ctrl.index;
	ctrl.isPassport = (gso.getAppConfig().peoId === 'PAS') ? true : false;
	ctrl.isAlpha = (gso.getAppConfig().peoId === 'ALP') ? true : false;
	ctrl.isAccord = (gso.getAppConfig().peoId === 'ACD') ? true : false;
	ctrl.isSOI = (gso.getAppConfig().peoId === 'SOI') ? true : false;

	ctrl.$onInit = function () {
		DS.find('benefits-guide-book','').then(function(response) {
			ctrl.response = response;
			ctrl.benefitGuideBookPdfData = response.benefitsGuideBook;
			// showVoluntaryLinks is used to roll out new voluntary PDFs by quarter.  By Q4 2018 all verticals will see the new PDFs.  Code 
			// can then be refactored to remove below logic
			ctrl.quarter = ctrl.benefitGuideBookPdfData.quater;
			ctrl.isQ1Passport = (ctrl.isPassport && ctrl.quarter === 'Q1') ? true : false;
			ctrl.isQ2Passport = (ctrl.isPassport && ctrl.quarter === 'Q2') ? true : false;
			ctrl.showVoluntaryLinks = (ctrl.isQ1Passport || ctrl.isQ2Passport || ctrl.isAlpha || ctrl.isAccord || ctrl.isSOI ) ? true : false;
			//End showVoluntaryLinks
			if(ctrl.showVoluntaryLinks) {
				DS.find('benefits-voluntary-links', '/voluntary-links?type=aflacVoluntary').then(function (data) {
					ctrl.voluntaryLinks = data.voluntaryLinks.pdfs
				}).catch(function (error) {
					console.log(error);
				});	
				
			}	
		}).catch(function(err) {
			console.log(err);
		});
	};

	ctrl.closeModal = function(){
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	}
}
