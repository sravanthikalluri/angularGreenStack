'use strict';

require('./tn-company-name.component.scss');

module.exports = {
	template: require('./tn-company-name.component.html'),
	bindings: {
		companyName: '@',
		logoUrl: '@',
		providerName: '@'
	},
	controller: ['$rootScope', CompanyNameController]
};

/* @ngInject */
function CompanyNameController($rootScope) {
	var ctrl = this;

	ctrl.getCompanyLogoClass = function() {
		return getLogoClassName(ctrl.logoUrl);
	};

	ctrl.goToSSOLink = function() {
		if(ctrl.providerName === 'UHC'){
			$rootScope.$broadcast('UHCPopup');
		}
		if(ctrl.providerName === 'Aetna'){
			window.open('/#/ssowidget/aetna', 'child');
		}
		if(ctrl.providerName === 'MetLife'){
			window.open('/#/ssowidget/metlife', 'child');
		}
	}
}

function getLogoClassName(logoUrl) {
	var logoUrlPath = logoUrl.split('/');
	var logoName = logoUrlPath[logoUrlPath.length-1].split('.')[0];
	logoName += ' tn-company-logo';

	return logoName;
}


