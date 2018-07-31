'use strict';

require('./tn-header-bar.component.scss');

module.exports = {
	template: require('./tn-header-bar.component.html'),
	controller: ['$state', 'gso', 'DS', '$window', '$timeout', 'companyNameService', '$location', 'sharedProperties', '$rootScope', 'utilService', 'passportUrlBuildService', '$cookies', '$http', 'SharedDataService','hrpSignOnService', TnHeaderBarController],
	bindings: {
		subtitle: '@',
		profilePicture: '@',
		mimeType: '@',
		slideMenu: '=',
		home: '<',
		companiesList: '<',
		monogram: '@'
	}
};

/* @ngInject */
function TnHeaderBarController($state, gso, DS, $window, $timeout, companyNameService, $location, sharedProperties, $rootScope, utilService, passportUrlBuildService, $cookies, $http, SharedDataService,hrpSignOnService) {
	var ctrl = this;
	ctrl.isMenuActive = false;
    ctrl.logoutClicked=false;
	var companies = [];
	var companiesDropDown = [];
	ctrl.componentsPermissions = sharedProperties.getComponentPermissions();
	var selectedMenuComponentPermissions = {};
	ctrl.hideLogo = false;

	ctrl.selectCompany = function (company) {
		ctrl.selectedCompany = company;
		$window.sessionStorage.setItem('companyName', company.companyDesc);
		companyNameService.switchCompany(company);
	};

	$rootScope.$on('menuLoad', function() {
		var companyThemeExists =  utilService.checkIfNavigationThemeExists("Company");
			if (!companyThemeExists || gso.getAppConfig().empStatus === "T") {
				angular.element(document.querySelector('#switchToAdminMenuItem')).css('display', 'none');
				angular.element(document.querySelector('#switchToEmployeeMenuItem')).css('display', 'none');
			}

			gso.getAppConfig().canViewAdminScreen = utilService.checkForAdminView();

			ctrl.menuIsLoaded = true;
		});

		ctrl.$onInit = function () {
			ctrl.hamburger = './assets/images/hamburger.png';
			ctrl.wingmark = './assets/images/trinet_wingmark.png';
			ctrl.slideMenu = 'non-active';

			angular.forEach(ctrl.companiesList.companyInfo, function (c) {
				companies.push({
					companyDesc: c.companyDesc,
					companyId: c.companyId,
					peoId: c.peoId,
					companyDescID: gso.getUtilService().compIdGen(c.companyDesc, "")
				});
			});

			ctrl.selectedCompany = companyNameService.getCurrentCompany(companies);
			var currentCompanyId = companyNameService.getCompanyId();

			if (!currentCompanyId) {
				currentCompanyId = companies[0].companyId;
			}


			angular.forEach(ctrl.companiesList.companyInfo, function (c) {

				if (c.companyId !== currentCompanyId) {
					companiesDropDown.push({
						companyDesc: c.companyDesc,
						companyId: c.companyId,
						peoId: c.peoId,
						companyDescID: gso.getUtilService().compIdGen(c.companyDesc, "")
					});
				}
			});
			ctrl.companies = companiesDropDown;
			ctrl.companyLogoUrl = '/CustomFolders/Objects/Company/' + currentCompanyId + '/Gifs/Logo.gif';
		};
		var searchImage = true;
		ctrl.getCompanyLogo = function (imageSrc) {
			if (imageSrc == null) {
			imageSrc = $location.protocol()+'://'+$location.host() +ctrl.companyLogoUrl;
		}
		else {
			if (searchImage) {
				var image = new Image();
				image.src = imageSrc;
				image.onerror = function () {
					searchImage = false;
					ctrl.hideLogo = true;
				}
				image.onload = function () {
					searchImage = false;
					ctrl.hideLogo = false;
				}
			}
			return imageSrc;
		}
		}

		ctrl.profile = function (menuId) {
			$state.go('app.main.profile');
			profileNavClick(menuId);
		};
		function profileNavClick(menuId) {
			SharedDataService.getAppSharedData().permissionId = menuId;
			ctrl.selectedMainMenu = null;
			SharedDataService.getAppSharedData().menuId = null;
			getPermissions(SharedDataService.getAppSharedData().permissionId);
		}

		function getPermissions(menuId) {
			SharedDataService.getAppSharedData().permissionId = menuId;
			if (ctrl.componentsPermissions !== undefined && ctrl.componentsPermissions !== null) {
				selectedMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions(ctrl.componentsPermissions[SharedDataService.getAppSharedData().permissionId]);
				sharedProperties.setComponentSelectedMenuPermissions(selectedMenuComponentPermissions);
			}
		}
		ctrl.imgClick = function () {
			if (ctrl.slideMenu === 'active') {
				ctrl.slideMenu = 'non-active';
			}
			else {
				ctrl.slideMenu = 'active';
			}
		};
		function clearStore() {
			localStorage.clear();
			$window.sessionStorage.clear();
		}
		function logoutXHR(url){
			var cookies = $cookies.getAll();
			var hrDomain = ".hrpassport.com";
			var currentDomain = $location.host();
			var trinetDomain = ".trinet.com";

			$http({
            	url: url,
                method: 'GET',
                withCredentials: true
            }).then(function(sucess){
				clearStore();
				angular.forEach(cookies, function (v, k) {
					$cookies.remove(k, { domain: currentDomain });
					$cookies.remove(k, { domain: hrDomain });
					$cookies.remove(k, { domain: trinetDomain });
				});
        		$timeout(function () {
                	utilService.redirectToLogin();
        		}, 4000);
			},function(err){

				clearStore();
				angular.forEach(cookies, function (v, k) {
				$cookies.remove(k, { domain: currentDomain });
					$cookies.remove(k, { domain: hrDomain });
					$cookies.remove(k, { domain: trinetDomain });
				});

        		$timeout(function () {
                	utilService.redirectToLogin();
        		}, 4000);
            });

		}
		ctrl.signOut = function () {
			hrpSignOnService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie(), true);
		};
		ctrl.adminView = function () {
			$window.open($location.protocol() + '://' + $location.host() + '/admin', '_self');
		};
		var params = {
			'USERID': gso.getAppConfig().userId,
			'TSESSIONID': gso.getAppConfig().authToken,
			'USER_COMPANY': gso.getAppConfig().companyId
		};

		ctrl.goToCurrentHRPSite = function () {
			var msvConfig = DS.get('microservices-config','0');
			var redirectURL = msvConfig.hrpUrl+'/Link2HR.eng?/Saf/Entry/Portal.htm&betaPref=0';
			$window.ga('send', 'event', 'buttons', 'click', 'goBackToPreviousSite-emp');
			window.open(redirectURL, 'child');
		};
	}
