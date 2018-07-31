'use strict';

require('./tn-benefits-help-card.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/overview/tn-benefits-help-card/tn-benefits-help-card.component.html',
	bindings: {
		data: '<'
	},
	controller: ['BenefitsGuidebookService', '$window','gso','$state',BenefitsHelpCard]
};

function BenefitsHelpCard(BenefitsGuidebookService, $window,gso,$state) {
	var ctrl = this;
	ctrl.guidebookArray = [];
	ctrl.showPdfLinks = true;
	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		if(gso.getAppConfig().countryCode ==='CA'){
			ctrl.showPdfLinks = false;
			ctrl.showSpinner = false;
		}else{
			BenefitsGuidebookService.find('').then(function(result) {
				angular.forEach(result.guideInfo.guideBookDesc, function(value) {
					var guidebook = {};
					if (value.date !== null) {
						guidebook.date = value.date.split('-')[0].split(',')[1].trim();
					}
					guidebook.url = value.url;
					guidebook.text = 'Benefits Guide Book';
					ctrl.guidebookArray.push(guidebook);
					ctrl.showSpinner = false;
				});
			});
		}
	};

	ctrl.openPdf = function(pdfLink) {
		var urlLink = '/api-content' + pdfLink;
		$window.open(urlLink, '_blank');
	};
	ctrl.redirectToResource = function(value){
		$state.go('app.main.benefits.resources',{response:value});
	};
}
