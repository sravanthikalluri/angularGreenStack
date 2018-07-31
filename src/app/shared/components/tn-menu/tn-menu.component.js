'use strict';

require('./tn-menu.component.scss');

/**
 * @ngdoc component
 * @name  tnMenu
 * @module trinet.shared.components
 *
 * @restrict E
 * @description
 *
 * @usage
 * <tn-menu></tn-menu>
 *
 */
module.exports = {
	template: require('./tn-menu.component.html'),
	controller: ['DS', '$scope', '$uibModal', '$window','$location', 'navigationService','$rootScope', 'ssoModalLinksConfig','sharedProperties','gso', 'SharedDataService', TnMenuController],
	bindings:{
		onSelect: '='
	}
};

/** @ngInject */
function TnMenuController(DS, $scope, $uibModal, $window,$location, navigationService,$rootScope, ssoModalLinksConfig,sharedProperties,gso, SharedDataService) {
	var ctrl = this;
	var openedMenu = null;

	ctrl.showSsoModal = false;

	ctrl.dataForModal = {};

	function toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt, index){
			return (index == 0 ? txt.charAt(0).toLowerCase() : txt.charAt(0).toUpperCase()) + txt.substr(1).toLowerCase();
		}).replace(/[^A-Z0-9]/ig, "");
	}

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		DS.find('menu', '').then(function(result) {
			ctrl.menus = result;
			SharedDataService.getAppSharedData().navigationSide = JSON.stringify(result);
			ctrl.menus = ctrl.menus.filter(function(m) {return m.theme !== 'Company'});
			ctrl.showSpinner = false;
			$rootScope.$broadcast('menuLoad', { data: result });
			ctrl.menus.map(function(menu){
				menu.menuId = gso.getUtilService().compIdGen(menu.text,"");
				$rootScope.$on('acknowledgements', function(event, args) {
					ctrl.formsAcknowledgements=args;
					if(args && menu.url === 'app.main.company.overview') {
						ctrl.select(menu);
					}
				});
				if (Array.isArray(menu.menus)) {
					menu.menus.map(function (subMenu) {
						if(subMenu.text.toLowerCase() === "overview"){
							subMenu.menuId = menu.menuId + subMenu.text.replace(/[^A-Z0-9]/ig, "");
						}
						else if(subMenu.text.toLowerCase() === "forms and policies"){
							subMenu.menuId = menu.menuId + subMenu.text.replace(/[^A-Z0-9]/ig, "");
						}
						else if(subMenu.text.toLowerCase() === "legal notices"){
							subMenu.menuId = menu.menuId + subMenu.text.replace(/[^A-Z0-9]/ig, "");
						}
						else{
							var newMenu = toTitleCase(subMenu.text);
							subMenu.menuId = gso.getUtilService().compIdGen(newMenu,"");
						}
					})
				}
			});
		});

		if (SharedDataService.getAppSharedData().menuId !== null && SharedDataService.getAppSharedData().menuId !== undefined) {
			var menuId = SharedDataService.getAppSharedData().menuId;
			menuId = parseInt(menuId, 10);
			selectMainMenu(menuId);
		}
	       //Todo: Fetching the permission to logged user
		DS.find('permissions', '').then(function (response) {
		  SharedDataService.getAppSharedData().componentsPermissions = response;
		  ctrl.componentsPermissions = response;
		  sharedProperties.setComponentPermissions(ctrl.componentsPermissions);
			updateNoticesPermissions(ctrl.componentsPermissions);
		 }).catch(function(error) {
			console.log('error is'+error);
	   });

	};
	function updateNoticesPermissions(permissions){
		var canEditNotices = false,
				editPermissions;
		editPermissions = permissions.get("73");
		if(editPermissions){
			for (var i = 0, len = editPermissions.length; i < len; i++) {
  			var perm = editPermissions[i];
				if(perm.id === 54 && perm.permission.canEdit){
					canEditNotices = true;
				}
			}
		}
		SharedDataService.getAppSharedData().editNotices = canEditNotices;
	}
	ctrl.select = function(menu, isExternal, redirectUrl) {

		var hrWindowName = "_blank";
		var msvConfig = DS.get('microservices-config','0');
		var gatewayUrl = "";
		if ( msvConfig != null && msvConfig.hrpUrl != null ) {
			if(redirectUrl  && redirectUrl.indexOf("CobraPayment")  !== -1 ){
				gatewayUrl = msvConfig.hrpUrl + "/trinetGateway/services/v1.0/redirect/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().personId + "?header=false&path=";
			} else{
				gatewayUrl = msvConfig.hrpUrl + "/trinetGateway/services/v1.0/redirect/" + gso.getAppConfig().companyId + "/" + gso.getAppConfig().personId + "?path=";
			}
		}

		if ( redirectUrl != null && redirectUrl !== undefined && (redirectUrl.indexOf("LSC")  != -1  || redirectUrl.indexOf("CobraPayment")  != -1)) {
			hrWindowName = "_trinetGateway";
			redirectUrl = gatewayUrl + redirectUrl.replace(/\s/g, '');
			$window.open(redirectUrl, hrWindowName);
		} else if (isExternal) {
			ctrl.openModal(redirectUrl);
		}

		if(redirectUrl && !isExternal){

			$window.open(redirectUrl, hrWindowName);
		}

		// only need to toggle the main menus
		if (menu.isMainMenu) {
			if (openedMenu) {
				if (openedMenu === menu) {
					menu.isOpen = !menu.isOpen;
				}
				else {
					openedMenu.isOpen = false;
					menu.isOpen = true;
				}
			}
			else {
				menu.isOpen = true;

			}
			openedMenu = menu;
		}
	};
	ctrl.adminView = function () {
			$window.open($location.protocol() + '://' + $location.host() + '/admin', '_self');
	};
	ctrl.openModal = function(redirectUrl) {

		var suppressModal = SharedDataService.getAppSharedData().suppressRedirectModal;

		var displayModal = false;

		for (var i = 0; i< ssoModalLinksConfig.keywords.length; i++) {
			if (redirectUrl.indexOf(ssoModalLinksConfig.keywords[i]) > -1) {
				displayModal = true;
				break;
			}
			else {
				displayModal = false;
			}
		}

		if (!suppressModal && displayModal){
			var message = 'You are now leaving TriNet and being redirected to a third party site.';

			ctrl.dataForModal = {
				redirectUrl: redirectUrl,
				message: message
			};

			$uibModal.open({
					template: '<tn-sso-redirect-modal redirect-url="' + redirectUrl +'"></tn-sso-redirect-modal>',
					component: 'tnSsoRedirectModal',
					resolve: {
						modalData: function() {
							return ctrl.dataForModal;
						}
					}
				});
		}
		else{
			$window.open(redirectUrl, 'redirect');
		}
	};

	$scope.selectedMainMenu = null;
	function selectMainMenu(menuId) {
		if (menuId) {
			$scope.selectedMainMenu = menuId;
		} else {
			// refresh or first load
			if ($scope.navigations !== undefined && $scope.navigations.side !== undefined && $scope.navigations.side !== null ) {
				$scope.selectedMainMenu = navigationService.getMainMenuId($scope.navigations.side, $location.path());
			}
		}
	}
}
