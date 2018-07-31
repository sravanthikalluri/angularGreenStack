'use strict';

require('../onboarding-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/onboarding-card/i9-onboarding/i9-onboarding.component.html',
	controller: ['DS', 'roleService',  'ssoModalLinksConfig', '$uibModal', '$window','SharedDataService',I9OnboardingController],
	bindings: {
		data: '<',
		i9ButtonClicked: '&'
	}
}

/* @ngInject */
function I9OnboardingController(DS, roleService,  ssoModalLinksConfig, $uibModal, $window, SharedDataService) {
	var ctrl = this;
	// ctrl.showOnboardingCard = true;
	ctrl.dataForModal = {};

	// Opens a modal for user to redirect to i9 verification
	ctrl.verifyClick = function (redirectUrl) {
		var suppressModal = SharedDataService.getAppSharedData().suppressRedirectModal; 
		var displayModal = false;
		for (var i = 0; i < ssoModalLinksConfig.keywords.length; i++) {
			if (redirectUrl.indexOf(ssoModalLinksConfig.keywords[i]) > -1) {
				displayModal = true;
				break;
			}
			else {
				displayModal = false;
			}
		}
		if (!suppressModal && displayModal) {
			var message = 'Complete your Form I-9. You are required to complete Section 1 of the Form I-9. Your worksite employer is responsible for completing Section 2 and must complete and sign Section 2 of your I-9 within three days of your hire date. You are now leaving TriNet and being redirected to third party site.';

			ctrl.dataForModal = {
				redirectUrl: redirectUrl,
				message: message
			};
			$uibModal.open({
				template: '<tn-sso-redirect-modal redirect-url="' + redirectUrl + '"></tn-sso-redirect-modal>',
				component: 'tnSsoRedirectModal',
				resolve: {
					modalData: function () {
						return ctrl.dataForModal;
					}
				}
			}).result.then(function(result){
				ctrl.i9ButtonClicked({$event:"I9 Pending"});
			});
		}
		else {
			ctrl.i9ButtonClicked({$event:"I9 Pending"});
			$window.open(redirectUrl, 'redirect');
		}
	};

}
