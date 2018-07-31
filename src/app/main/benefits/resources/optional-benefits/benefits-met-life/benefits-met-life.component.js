'use strict';

require('./benefits-met-life.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/optional-benefits/benefits-met-life/benefits-met-life.component.html',
	controller: ['DS', '$location', 'gso', BenefitsMetLifeController],
	bindings: {
		resolve: '<',
		modalInstance: '<',
		index: '<'
	}
};
/* @ngInject */
function BenefitsMetLifeController(DS, $location, gso) {
	var ctrl = this;
	ctrl.indexId = ctrl.index;
	ctrl.isSOI = false;
	ctrl.isAmbrose = (gso.getAppConfig().peoId === 'AMB') ? true : false;
	ctrl.isPassport = (gso.getAppConfig().peoId === 'PAS') ? true : false;
	ctrl.isAlpha = (gso.getAppConfig().peoId === 'ALP') ? true : false;
	ctrl.isAccord = (gso.getAppConfig().peoId === 'ACD') ? true : false;
	ctrl.isSOI = (gso.getAppConfig().peoId === 'SOI') ? true : false;	
	
	ctrl.$onInit = function () {		
		DS.find('benefits-met-life', '').then(function (response) {
			ctrl.metlifeBenefitsData = response;
		}).catch(function (err) {
			console.log(err);
		});

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
				DS.find('benefits-voluntary-links', '/voluntary-links?type=metLifeVoluntary').then(function (data) {
					ctrl.voluntaryLinks = data.voluntaryLinks.pdfs
				}).catch(function (error) {
					console.log(error);
				});	
			}					
		}).catch(function(err) {
			console.log(err);
		});
	};
	ctrl.metlifeLoc = $location.path().split('/')[2];

	ctrl.closeModal = function () {
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	}
}
