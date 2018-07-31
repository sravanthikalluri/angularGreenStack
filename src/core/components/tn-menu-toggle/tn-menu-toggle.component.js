'use strict';

require('./tn-menu-toggle.component.scss');

/**
 * @ngdoc component
 * @name  tnMenuLink
 * @module trinet.core.components
 *
 * @restrict E
 * @description
 *
 * @usage
 * <tn-menu-toggle></tn-menu-toggle>
 *
 */
module.exports = {
	template: require('./tn-menu-toggle.component.html'),
	controller: ['$state',TnMenuToggleController],
	bindings: {
		menu: '<',
		onSelect: '&',
		closeSlider: '='
	}
};

/* @ngInject */
function TnMenuToggleController($state) {
	var ctrl = this;
   // ToDo: Adding Dynamic ID for API Automation purpose
	/*ctrl.$onInit = function() {
		ctrl.menu.menuId = ctrl.menu.text.replace(/\s/g, '').charAt(0).toLowerCase() + ctrl.menu.text.replace(/\s/g, '').slice(1);
		angular.forEach(ctrl.menu.menus,function(subMenu){
			subMenu.menuId = ctrl.menu.menuId + subMenu.text.replace(/\s/g, '');
		});
	};*/
	ctrl.select = function($event, isExternal, redirectUrl) {
		ctrl.onSelect({
			$event: $event,
			isExternal: isExternal,
			redirectUrl: redirectUrl
		});
	};

	// open child menu on manual refresh
	if ($state.includes(ctrl.menu.url)) {
		ctrl.select(ctrl.menu);
	}
}
