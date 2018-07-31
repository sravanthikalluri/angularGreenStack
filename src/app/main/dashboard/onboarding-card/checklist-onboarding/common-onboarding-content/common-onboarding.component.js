'use strict';

require('../../onboarding-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/onboarding-card/checklist-onboarding/common-onboarding-content/common-onboarding.component.html',
	controller: ['DS', '$http', 'manageEmpUrlConfig', '$rootScope', '$state', '$translate', '$uibModal', '$window', CommonOnboardingController],
	bindings: {
		btnActionText: '<',
		btnCompleteText: '<',
		btnSkipText: '<',
		data: '<',
		icon: '<',
		message: '<',
		showButtons: '<',
		showView: '<',
		taskName: '<'
	}
}

/* @ngInject */
function CommonOnboardingController(DS, $http, manageEmpUrlConfig, $rootScope, $state, $translate, $uibModal, $window) {
	var ctrl = this;
	// Checking for edge or ie
	var trident = window.navigator.userAgent.indexOf('Trident/') >= 0 ? "ie": null;
	var edge = window.navigator.userAgent.indexOf('Edge/') >= 0 ? "edge": null;
	var browser = trident == null ? edge: trident;
	// Function opens a modal that views pdf. 
	ctrl.getPdfViewer = function () {
		ctrl.showSpinner = true;
		//Function is getting the pdf
		$http.get(manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + $window.sessionStorage.companyId + "/" + $window.sessionStorage.empId + manageEmpUrlConfig.resources.wtpa, {
			responseType: 'arraybuffer'
		}).then(
			function (response) {
				if (!trident && !edge){
					ctrl.nonMSPdf(response, null)
				}
				else{
					ctrl.msPdf(browser);
				}
			},
			function (error) {
				// No pdf! Need to create one and get it
				$http.post(manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + $window.sessionStorage.companyId + "/" + $window.sessionStorage.empId + manageEmpUrlConfig.resources.wtpa, {
					responseType: 'arraybuffer'
				}).then(
					function (response) {
						if (!trident && !edge){
							ctrl.nonMSPdf(response, null)
						}
						else{
							ctrl.msPdf(browser);
						}
					},
					function (error) {
						// Error in creating pdf. Turning off spinner
						ctrl.showError(error);
					}
				);

			}
		);
	}

	ctrl.nonMSPdf = function (response, browser) {
		try {
			// Got Pdf. Converting to blob and creating url
			var pdfBlob = new Blob([response.data], { type: "Application/pdf" });
			var pdfUrl = URL.createObjectURL(pdfBlob);
			ctrl.showModal(pdfUrl, browser);
		}
		catch (error) {
			ctrl.showError(error);
		}
	}

	ctrl.msPdf = function(browser){
		var pdfUrl = manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + $window.sessionStorage.companyId + "/" + $window.sessionStorage.empId + manageEmpUrlConfig.resources.wtpa
		ctrl.showModal(pdfUrl, browser);
	}

	// Function redirects to other greenstack pages and makes an api call to update the checklist
	ctrl.redirectPage = function () {
		if (ctrl.taskName == 'wtpa') {
			ctrl.getPdfViewer();
		}
		else if (ctrl.taskName.indexOf('canadian') >= 0) {
			switch (ctrl.taskName) {
				case 'canadian-tax-credit':
					$state.go('app.main.money.taxes');
					break;
				case 'canadian-benefits-1':
					$state.go('app.main.benefits.resources');
					break;
				case 'canadian-benefits-2':
					$state.go('app.main.benefits.resources');
					break;
				case 'canadian-benefits-3':
					$state.go('app.main.money.taxes');
					break;
			}
		}
		else {
			switch (ctrl.taskName) {
				case 'direct-deposit':
					$rootScope.$emit('onboardingStartToggle', {taskId: "DIRECT_DEPOSIT"});
					$state.go('app.main.money.direct-deposit');
					break;
				case 'emergency':
					$rootScope.$emit('onboardingStartToggle', {taskId: "EMERGENCY_CONTACT"});
					$state.go('app.main.edit-profile-emergency');
					break;
				case 'profile':
					DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: ctrl.data['onboardTask'], date: ""}}).
						then(function (result) {
							// Save successful. Redirecting
							$state.go('app.main.profile');
						});
					break;
				case 'tax-withholding':
					DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: ctrl.data['onboardTask'], date: ""}}).
						then(function (result) {
							// Save successful. Redirecting
							$state.go('app.main.money.taxes');
						});
					break;
			}
		}
	}

	ctrl.showError = function (error) {
		ctrl.showSpinner = false;
		ctrl.data['completionDate'] = " ";
		$rootScope.$emit("onboardingComponent", { value: "error" });
		console.error(error);
	}

	ctrl.showModal = function (pdfUrl, browser) {
		ctrl.showSpinner = false;
		// Setting and creating ui modal
		$translate(["acknowledge", "onboarding-wtpa-info-title", "onboarding-wpta-info-title-body", "onboarding-wtpa-error", "onboarding-ie-open-in-new-window"]).then(function (translatedText) {
			ctrl.dataForModal = {
				"browser":browser,
				"IEError": translatedText["onboarding-wtpa-error"],
				"IEOpenSavePdf": translatedText["onboarding-ie-open-in-new-window"],
				"okText": translatedText['acknowledge'],
				"title": translatedText['onboarding-wtpa-info-title'],
				"titleBody": translatedText['onboarding-wpta-info-title-body'],
				"pdfPath": pdfUrl
			};
			$uibModal.open({
				template: '<tn-pdf-view-modal></tn-pdf-view-modal>',
				component: 'tnPdfViewModal',
				resolve: {
					modalData: function () {
						return ctrl.dataForModal;
					}
				}
			}).result.then(function (result) {
				try {
					// User acknowledged pdf and is updating newhire task, ui, and wtpa
					ctrl.data['completionDate'] = result['$value'];
					var url = manageEmpUrlConfig.manageBaseUrl + manageEmpUrlConfig.resources.payroll + "/" + $window.sessionStorage.companyId + "/" + $window.sessionStorage.empId + manageEmpUrlConfig.resources.wtpa
					$http.put(url).then(
						function (result) { }
					);
					DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: ctrl.data['onboardTask'], date: ""}}).
						then(function (result) {
							$rootScope.$emit("onboardingComponent", { value: "next" });
					});
				}
				catch (error) { }
			});
		})
	}

	ctrl.skip = function(){
		DS.update('onboarding-post-task', '', '{"skipped":true}', { extraUrlParams: { taskId: ctrl.data['onboardTask'], date: "" }}).
		then(function(result){
			ctrl.data['completionDate'] = "Completed";
			$rootScope.$emit("onboardingSkipEvent", {value:"skipped"});
		})
	}

}
