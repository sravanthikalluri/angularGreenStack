'use strict';

require('./tn-pdf-view-modal.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-pdf-view-modal/tn-pdf-view-modal.component.html',
	controller: ['DS', '$sce', '$scope', tnPdfViewModalController],
	bindings:{
		dimiss:'&',
		modalInstance: '<',
		resolve: '<'
	}
};

/* @ngInject */
function tnPdfViewModalController(DS, $sce, $scope) {
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.setValue("browser", ctrl.resolve.modalData.browser);
		ctrl.setValue("cancelText", ctrl.resolve.modalData.cancelText);
		ctrl.setValue("IEError", ctrl.resolve.modalData.IEError);
		ctrl.setValue("IEOpenSavePdf", ctrl.resolve.modalData.IEOpenSavePdf);
		ctrl.setValue("okText", ctrl.resolve.modalData.okText);
		ctrl.setValue("title", ctrl.resolve.modalData.title);
		ctrl.setValue("titleBody", ctrl.resolve.modalData.titleBody);
		ctrl.setValue("pdfPath", $scope.trustSrc(ctrl.resolve.modalData.pdfPath));
	}
	// Function dismisses the modal with no message
    ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};

	// Function sends an ok to the parent controller for the parent to interact with
	ctrl.ok = function(){
		ctrl.modalInstance.close({$value: "ok"});
	}

	// A setter function to make sure that the values are set. Upon error the setter assumes user did not want that option
	ctrl.setValue = function(key, value){

		try{
			ctrl[key] = value;
		}
		catch(error){

		}
	}

	// Function makes url a trusted src
	$scope.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	}

}