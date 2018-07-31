'use strict';

require('./tn-menu-link.component.scss');

/**
 * @ngdoc component
 * @name  tnMenuLink
 * @module trinet.core.components
 *
 * @restrict E
 * @description
 *
 * @usage
 * <tn-menu-link menu=""></tn-menu-link>
 *
 */
module.exports = {
	template: require('./tn-menu-link.component.html'),
	controller: ['gso','SharedDataService', 'moneyUrlConfig', TnMenuLinkController],
	transclude: true,
	bindings: {
		menu: '<',
		onSelect: '&',
		closeSlider: '=',
		permission:'<'
	}
};

function TnMenuLinkController(gso, SharedDataService, moneyUrlConfig) {
	var ctrl = this;

	ctrl.select = function(event) {
		if (gso.getAppConfig().peoId === 'AMB' && ctrl.menu.text === 'Employment Verification') {
			event.preventDefault();
			window.open(moneyUrlConfig.moneyBaseUrl + moneyUrlConfig.resources.employmentVerification + '/' + gso.getAppConfig().companyId + '/' + gso.getAppConfig().userId + moneyUrlConfig.resources.ambroseVerification, '_blank');
		} else {
			if (ctrl.menu.target === '_blank'){
				ctrl.redirectUrl = ctrl.menu.url;
				if(ctrl.checkForTriNetCloudApps()){
					ctrl.isExternal = true;
				}
			}
			if (ctrl.menu.target !== '_blank' && ctrl.menu.menus === undefined){
				ctrl.closeSlider = 'non-active';
			}
			ctrl.onSelect({
				$event: ctrl.menu,
				isExternal: ctrl.isExternal,
				redirectUrl: ctrl.redirectUrl
			});
			if (ctrl.menu.text === "Settings") {
				SharedDataService.getAppSharedData().permissionId = 2;
			} else {
				SharedDataService.getAppSharedData().permissionId = ctrl.menu.id;
			}
		}
	};
	ctrl.checkForTriNetCloudApps = function(){
		if( ctrl.menu.id === 121 ||
			ctrl.menu.id === 124 ||
			ctrl.menu.id === 114 ||
			ctrl.menu.id ===  32 ||
			ctrl.menu.id === 115){
			return false;
		}
		return true;
	}
}
