'use strict';

require('./tn-earnings-statement-modal.component.scss');

module.exports = {
	template: require('./tn-earnings-statement-modal.component.html'),
		controller: ['DS', 'moneyUrlConfig', '$http', '$timeout', tnEarningsStatementModalController],
		transclude: true,
		bindings: {
			data: '<',
			onShow: '=',
			modalHeader: '=',
			onClick: '&',
			onDownload: '&',
			showSpinner: '<',
			selectedIndex: '<'
		}
};

function tnEarningsStatementModalController(DS, moneyUrlConfig, $http, $timeout) {
	var ctrl = this;

	ctrl.onClose = function(){
		ctrl.onShow = false;
		angular.element(document.querySelector("body")).removeClass("hidden-overflow");
		if(ctrl.selectedIndex === undefined){
			angular.element('button#lastPayCheckDetailsBtn').focus();
		}else{
			angular.element('#paycheck-' + ctrl.selectedIndex).focus();
		}
	};


	ctrl.onClick = function(e){
		var url = moneyUrlConfig.moneyApi
			+ moneyUrlConfig.moneyBaseUrl
			+ moneyUrlConfig.resources.payroll
			+ '/' + ctrl.data.header.companyId
			+ '/' + ctrl.data.header.employeeId
			+ moneyUrlConfig.resources.payCheckDetailsPdf + '/'
			+ ctrl.data.detail.key.payGroup + '_'
			+ ctrl.data.detail.key.offCycle + '_'
			+ ctrl.data.detail.key.payEndDt + '_'
			+ ctrl.data.detail.key.pageNo + '_'
			+ ctrl.data.detail.key.lineNo + '_'
			+ ctrl.data.detail.key.sepChk + '_'
			+ ctrl.data.detail.key.effDt;

		    $http.get( url, { responseType: 'arraybuffer' })
		    	.success(function(data){
	    			var file = new Blob([data], { type: 'application/pdf' });
				    var fileURL = URL.createObjectURL(file);

				    //Checking for IE Browser
					if (window.navigator && window.navigator.msSaveOrOpenBlob) {
						window.navigator.msSaveOrOpenBlob(file);
					}
					else {
						var pdf = 'data:application/octet-stream;base64,' + data;
						var downloadElement = document.getElementById('earningStatemetnDownload');
						downloadElement.href = fileURL;
						e.preventDefault();
						downloadElement.click();
						//window.open(fileURL);
					}


		    	});
		//DS.find('earnings-statement', '', {endpoint: endpointString});
	};

	ctrl.$onInit = function() {
		angular.element(document.querySelector("body")).addClass("hidden-overflow");
		if(ctrl.modalHeader === undefined || ctrl.modalHeader === true ){
			ctrl.header = true;
		}
		else {
			ctrl.header = false;
		}
		$timeout(function(){
			angular.element(document.querySelector("#open-earnings-modal")).focus();
		},1000);
	};

	ctrl.moveFocusToClose = function(){
		  angular.element(document.querySelector("button#download-print-pdf")).focus();
	};

};
