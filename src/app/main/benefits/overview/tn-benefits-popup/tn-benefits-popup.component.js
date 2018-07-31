'use strict';

require('./tn-benefits-popup.component.scss');

module.exports = {
	template: require('./tn-benefits-popup.component.html'),
    controller: ['$timeout',tnBenefitsPopupController],
    bindings: {
		plan: '<'
	}
};
function tnBenefitsPopupController($timeout) {
	var ctrl = this;

	ctrl.$onInit = function(){
        ctrl.showSpinner = true;
        ctrl.uhcInfo = [
            {
                name: "CLAIMS",
                title: "Claims Summary",
                description: "Important information about your claim"
            },
            {
                name: "PROVSEARCH",
                title: "Find Physicians and Facilities",
                description: ""
            },
            {
                name: "PHARM",
                title: "Find Pharmacy and Prescriptions",
                description: ""
            },
            {
                name: "BENEFITSANDCVG",
                title: "Benefit and Coverage",
                description: "Manage your account information"
            },
            {
                name: "FSA",
                title: "FSA Summary",
                description: "View your benefits"
            },
            {
                name: "IDCARD",
                title: "Request ID Cards",
                description: "Print temporary health plan ID cards"
            },
            {
                name: "HA",
                title: "Health Assessment",
                description: "Health Information"
            }
        ];
	}

	$timeout(function () {
		ctrl.showSpinner=false;
    }, 1);

    ctrl.goToSSO = function(name){
        var url = '/#/ssowidget/uhc?param='+name;
        window.open(url, 'child');
    };
};
