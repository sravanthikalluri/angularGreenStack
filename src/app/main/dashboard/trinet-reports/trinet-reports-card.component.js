'use strict';


module.exports = {
	template: require('./trinet-reports-card.component.html'),
	controller: ['$window','SharedDataService','DS' ,'moment',trinetReportsCtrl],
	bindings:{
		isShow : '@'
	}
};

/* @ngInject */
function trinetReportsCtrl($window,SharedDataService,DS,moment) {
	var ctrl = this;
	ctrl.showSpinner = true;
	ctrl.$onInit = function() {
		if(ctrl.isShow){
			DS.find('termination-date', '').then(function (results) {
				ctrl.showSpinner = false;
				if(results.terminationDate){
					var totalDays = Math.abs(moment().diff(results.terminationDate,'days'));
					var fromYears = moment.duration({'years': 1});
					ctrl.remainingDays = fromYears.asDays() - totalDays;
				}
			}).catch(function(error) {
				ctrl.showSpinner = false;
			});
		}

	};
   ctrl.reDirectToReports = function () {
	   var reportingHost = SharedDataService.getAppSharedData().reportsuiBaseUrl;
	   var clientReportsUrl = reportingHost+'/UIGateway.jsp';
	   window.open(clientReportsUrl, 'Client Reports');
	}
}
