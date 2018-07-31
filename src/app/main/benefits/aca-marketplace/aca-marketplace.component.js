'use strict';


require('./aca-marketplace.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/aca-marketplace/aca-marketplace.component.html',
	controller: ['DS','gso',AcaMarketPlaceController]
};

/* @ngInject */
function AcaMarketPlaceController(DS,gso) {
	var ctrl = this;
	ctrl.$onInit=function(){
		DS.find('benefit-aca-marketplace','').then(function(result) {
			ctrl.acaMarketPlace = result.acaMarketPlace;
			ctrl.countryCode = gso.getAppConfig().countryCode;
			ctrl.companyId = gso.getAppConfig().companyId;
		});
	}

	ctrl.printSection = function () {
		var prtContent = document.getElementById("acaMarketPlace");
		if (prtContent) {
			var WinPrint = window.open('','left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
			WinPrint.document.write('<html><head><title>Print ACA Marketplace Notification</title>');
			WinPrint.document.write('<link rel="stylesheet" href="./#/app/main/benefits/acaMarketPlace/aca-marketplace.component.scss" media="print" type="text/css" />');
			WinPrint.document.write('</head><body >');
			WinPrint.document.write(prtContent.innerHTML);
			WinPrint.document.write('</body></html>');

			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			WinPrint.close();

		}
	};
}
