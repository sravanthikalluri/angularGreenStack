'use strict';


require('./legal-notices.component.scss');


module.exports = {
	templateUrl: 'app/main/company/compliance/legal-notices/legal-notices.component.html',
	controller: ['DS','$window',legalNoticesController]
};


/* @ngInject */
function legalNoticesController(DS,$window) {
	var ctrl = this;
	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		DS.find('legalNoticesService','').then(function(result){
			ctrl.legalNotices = result.legalNotices;
			ctrl.showSpinner = false;
		}).catch(function(error){
			ctrl.errorMessage = error.data._error.message;
			ctrl.showSpinner = false;
		});

     };

     ctrl.openPdf = function(url){
     if(url.startsWith('http')){
		$window.open(url, '_blank');
     }else{
	   var urlLink = "/api-content" + url;
	   $window.open(urlLink, '_blank');
	 }
	};
}
