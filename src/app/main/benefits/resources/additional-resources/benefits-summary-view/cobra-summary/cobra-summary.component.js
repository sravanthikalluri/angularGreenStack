'use strict';

require('./cobra-summary.component.scss');

module.exports = {
	templateUrl: 'app/main/benefits/resources/additional-resources/benefits-summary-view/cobra-summary/cobra-summary.component.html',
	controller: ['DS' ,'gso',CobraSummaryController],
	bindings: {
		planData:'<',
		resolve: '<',
		modalInstance: '<',
		modalData:'<'
	}
};
/* @ngInject */
function CobraSummaryController(DS,gso) {
	var ctrl = this;

	ctrl.showResults = null;

	ctrl.cobraBenefitsSummaryData = null;
	ctrl.cobraData = null;
	ctrl.nullbucket = true;
	ctrl.startDate = ctrl.resolve.modalData.startDate;
	ctrl.endDate = ctrl.resolve.modalData.endDate;

	var options = {
		params: {
			type: 'cobra',
			startDate: ctrl.startDate,
			endDate: ctrl.endDate
		}
	}
	ctrl.$onInit = function () {
		DS.find('benefits-cobra-summary', '', options).then(function (response) {
				ctrl.cobraBenefitsSummaryData = response.cobraSummaryData;
				angular.forEach(ctrl.cobraBenefitsSummaryData, function (val1) {
					if (val1.length !== 0) {
						ctrl.nullbucket = false;
					}
				});
				ctrl.showResults = true;
			},
			function (data) {
				ctrl.nullbucket = true;
				ctrl.cobraBenefitsSummaryData = null;
				ctrl.errorAlert = data;
			}).catch(function (err) {
				console.log(err);
			});
	};

	ctrl.printSection = function () {
		var prtContent = document.getElementById('printPage');
		if (prtContent) {
			var WinPrint = window.open('','left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
			WinPrint.document.write('<html><head><title>Print Cobra Costs</title>');
			WinPrint.document.write('<link rel="stylesheet" href="./#/app/main/benefits/resources/additional-resources/benefits-summary-view/cobra-summary/cobra-summary.component.scss" media="print" type="text/css" />');
			WinPrint.document.write('</head><body >');
			WinPrint.document.write('<h2 align="center">Your Monthly COBRA Costs</h2>');
			WinPrint.document.write(prtContent.innerHTML);
			WinPrint.document.write('</body></html>');

			WinPrint.document.close();
			WinPrint.focus();
			WinPrint.print();
			WinPrint.close();
		}
	};

	ctrl.closeModal = function () {
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
		ctrl.modalInstance.close("cancel");
	};
}
