'use strict';

require('./tn-eforms-acknowledgement-modal.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-eforms-acknowledgement-modal/tn-eforms-acknowledgement-modal.component.html',
	controller: ['$sce', '$filter', '$state', '$rootScope', tnEformsAcknowledgementModalController],
	bindings:{
		closeSsoModal: '&',
		redirect: '&',
		modalInstance: '<',
		modalData: '<',
		resolve: '<'
	}
};

/* @ngInject */

function tnEformsAcknowledgementModalController($sce, $filter, $state, $rootScope) {

	var ctrl = this;
	ctrl.$onInit = function(){
		ctrl.confirmatonMessage = ctrl.formatConfirmationMessage();
	};

	ctrl.closeModal = function(){
		ctrl.showModal = false;
		ctrl.modalInstance.dismiss("cancel");
	}

	ctrl.formatConfirmationMessage = function() {
		var translationText = $filter('translate')('eformsAcknowledgement.modalPopUpMessage');
		var modalPopUpHere = $filter('translate')('eformsAcknowledgement.modalPopUpHere');

		translationText += "<a href ng-click='$ctrl.goToAcknowledgements();' class='semibold'>" + modalPopUpHere + "</a>.";
		return $sce.trustAsHtml(translationText);
	};

	ctrl.goToAcknowledgements = function() {
		$rootScope.$broadcast('acknowledgements', true);
		$state.go('app.main.company.acknowledgements');
		ctrl.closeModal();

	};
}
