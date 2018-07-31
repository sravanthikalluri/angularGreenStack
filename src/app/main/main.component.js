'use strict';

/**
 Description: This is controller covered functions like fetch employee details, security permissions, load menu component and sign out
 Modified By:Raghavendra Kumar Bonthala
 **/
module.exports = {
  templateUrl: 'app/main/main.component.html',
  controller: [
    '$scope', 'DS', 'gso', 'apiConfigService', '$window', 'companyNameService', '$location', 'Location', '$rootScope', 'CurrentCompanyIdCookie', '$uibModal', 'deviceDetector', 'hrpSignOnService', 'utilService', 'hrpUserToken', '$http', '$cookies', 'loginUrlConfig', 'SharedDataService','$state',
     mainController],
  bindings: {
  	showMenu: '<'
  }
};

require('./main.component.scss');

/* @ngInject */
	function mainController ($scope, DS, gso, apiConfigService, $window, companyNameService, $location, Location, $rootScope, CurrentCompanyIdCookie, $uibModal, deviceDetector, hrpSignOnService, utilService, hrpUserToken, $http, $cookies, loginUrlConfig, SharedDataService,$state) {
		var ctrl = this;

    ctrl.hideHeader = false;

    ctrl.isFirstLogin  = !localStorage.getItem('notFirstLogin');
    ctrl.browserIE = false;
		ctrl.showMenu = 'not-active';
		ctrl.company = '';
		ctrl.profilePicture = "";// "http://www.piedpiper.com/app/themes/pied-piper/dist/images/gilfoyle.png";
		ctrl.notices = [ {date:'8/1/16', message:'Tempo is down'},
			{date:'7/12/16', message:'Submit tempo'},
			{date:'6/4/16', message:'Welcome to TriNet'}
		];
        ctrl.alertError = {
			_statusCode: '401',
			_statusMessage: 'Your session has been inactive for 45 minutes. For your protection, you have been automatically logged out. You must log back in to proceed.'
		};
		ctrl.browseError = {
			_statusCode: '000',
			_statusMessage: 'You are using an older version of Internet Explorer. This version is not supported by our website and will prevent you from accessing certain features of this website. Please upgrade to Internet Explorer 11, or the latest Firefox, Chrome or Safari browsers to improve your browsing experience.'
		};
		ctrl.betaPref = '';
		ctrl.reloadPermission= $state.current.url==='/dashboard'?ctrl.reload=true:ctrl.reload=false;
		$scope.setContentBackground = function (){
			var contentBackground = '';
			var formattedPath = $location.path().toLowerCase().replace('/','');
			if ((formattedPath.indexOf('dashboard') > -1) || formattedPath === ''){
				contentBackground = 'tn-dashboard-grey';
			}
			return contentBackground;
		};

		$rootScope.$on('$stateChangeSuccess',
            function(event){
                if (!$window.ga)
                    return;
                $window.ga('send', 'pageview', { page: $location.path() });
        });

		var companyId = companyNameService.getCompanyId();
		var companyDesc = companyNameService.getCompanyDesc();
		var peoId = companyNameService.getPeoId();

    function getPathUrl() {
      var formattedPath = $location.path().toLowerCase().replace('/','');
      if (formattedPath.indexOf('fsa-calculator') > -1){
        ctrl.hideHeader = true;
      }
    }

		function getProfilePicture() {
			var companyId = $window.sessionStorage.getItem('companyId');
			var empId = $window.sessionStorage.getItem('empId');
			var url = '/api-profile/v1/profile/'+companyId+'/'+empId+'/photos';

			$http.get(url, { responseType: 'arraybuffer' })
				.success(function (data) {
					var showImage = (data.byteLength <=1000) ? false : true;
					if(showImage){
					var arrayBufferView = new Uint8Array(data);
					var blob = new Blob([arrayBufferView], { type: "image/jpeg, image/png" });
					var imageUrl = URL.createObjectURL(blob);
					ctrl.profileImage = imageUrl;
					gso.getAppConfig().profilePicture = imageUrl;
					ctrl.profilePicture = gso.getAppConfig().profilePicture;
				}
		});
		}
		function getCurrentCompany () {
			gso.getAppConfig().userId = $window.sessionStorage.getItem('empId');
			gso.getAppConfig().personId = $window.sessionStorage.getItem('personId');
			var firstTimeLogin = $window.sessionStorage.getItem('firstTimeLogin');
			if ( firstTimeLogin == null || firstTimeLogin === undefined ) {
				validateOpenAMTokenForAllSessions();
			}


			DS.find('company-info', '').then(function (results) {
				ctrl.companiesList = results;
				if(!companyId || companyId === null || companyId === "undefined"){
					companyId = results.companyInfo[0].companyId;
				}
				if(!companyDesc || companyDesc === null || companyDesc === "undefined"){
					companyDesc = results.companyInfo[0].companyDesc;
				}
				if(!peoId || peoId === null || peoId === "undefined"){
					peoId = results.companyInfo[0].peoId;
				}

				gso.getAppConfig().companyId = companyId;
				$window.sessionStorage.setItem('companyId', companyId);
				$window.sessionStorage.setItem('peoId', peoId);
				if (results.companyInfo.length > 0) {
					CurrentCompanyIdCookie.createCurrentCompanyIdCookie(companyId);
				}
				gso.getAppConfig().peoId = peoId;
				gso.getAppConfig().companyName = ctrl.company = companyDesc;

				getInterstitialData();
				$rootScope.$on('menuLoad', function (event, args) {
					// ctrl.reloadPermission?checkEformsAcknowledgements():angular.noop();

					/* have to check the current url becuase
					*  edit direct deposit has reload:true which will reload current and parent state.
					*  With below if condtion Acknowelegement model will not pop up when we edit and save direct deposit.
					*/
					if($state.current.url==='/dashboard' && ctrl.reloadPermission){
					  checkEformsAcknowledgements();
					}else{
					  angular.noop();
					}
				});


			}).catch(function(error) {
				console.log('error:' + error);
			});
		}

        function getInterstitialData () {
                DS.find('interstitial-data', '').then(function (results) {
                        // Check to see if there are any required interstitial pages.
                        if (results.componentName) {
                                // We need to redirect to the interstitial service
                                $window.location.href = '/ui-interstitial/#';
                                return;
                        }

                        // We need to retrieve the remaining items required by the portal.
                        // We don't want to
						getHRPSession();
						empDetails();
					    if(ctrl.reloadPermission) {
							getBetaPreference();
						}
						getProfilePicture();
            getPathUrl();
			}).catch(function(error) {
				console.log('error:' + error);

			});
		}

		function getHRPSession () {
			hrpSignOnService.login(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie());
      //hrpUserToken.login(gso.getAppConfig().companyId, gso.getAppConfig().userId, gso.getUtilService().getCookie());
		}

		/* Employee Information fetched */
		ctrl.$onInit = function () {
      if (!String.prototype.startsWith) {
				String.prototype.startsWith = function(searchString, position) {
					position = position || 0;
					return this.indexOf(searchString, position) === position;
				};
			}
			identifyIEBrowser();
			$window.ga('send', 'pageview');
			// Get config details before initializing others
				DS.find('microservices-config', '').then(function (results) {
				//console.log("microservice cookie name=" + results.cookieName);
				emplInfo();
				}).catch(function(error) {
					console.log('microservices config error is' + error);
					// DS does not return 302 http status cod
					// this could fail when the server is down or cookie is not valid
					gso.getUtilService().logout(false);
				});

		};

		function emplInfo() {
			var msvConfig = DS.get('microservices-config','0');
			SharedDataService.getAppSharedData().cookieName = msvConfig.cookieName;
			SharedDataService.getAppSharedData().hrpUrl = msvConfig.hrpUrl;
			SharedDataService.getAppSharedData().platformUrl = msvConfig.platformUrl;
			SharedDataService.getAppSharedData().reportsuiBaseUrl = msvConfig.reportsuiBaseUrl;
			SharedDataService.getAppSharedData().ssoUrl = msvConfig.ssoUrl;
			
			ctrl.msvConfig=msvConfig;
			if(msvConfig) {
				injectWalkMe(msvConfig.walkmeUrl);
			}
			if ( gso.getUtilService().getCookie() == undefined || gso.getUtilService().getCookie() == null || gso.getUtilService().getCookie() == '') {
				// Logout if there is no cookie present
				gso.getUtilService().logout(false);
				console.log('Auth: No valid token found');
			} else {
				// Session storage is different for each tab.
				if ($window.sessionStorage.getItem('empId') === null) {
					var trinetAuthAPIEndPoint = loginUrlConfig.loginAPI + loginUrlConfig.loginBaseURL + loginUrlConfig.resources.empDetails + gso.getUtilService().getCookie() + "?realm=sw_hrp";

					DS.find('emp-info', '',{ endpoint: trinetAuthAPIEndPoint }).then(function (results) {
						$window.sessionStorage.setItem('empId', results.emplid);
						gso.getAppConfig().userId = $window.sessionStorage.getItem('empId');
						gso.getAppConfig().personId = results.personid;
						$window.sessionStorage.setItem('personId', results.personid);
						getCurrentCompany();

					}).catch(function(error) {
						// Redirect to login if TriNetAuth fails to get details.
						gso.getUtilService().logout(false);
						console.log('Auth: error is' + error);
					});
				} else {
					getCurrentCompany();
				}
			}
		}
		function injectWalkMe (walkmeUrl)
        {
             // inject wow walkme files with cache busting

			 var myElements = document.getElementsByTagName ( 'head')[ 0 ];
			 var wowElement = null;
			 // cache bust
			 var uiNum = new Date().getTime();
			 var strUrlPostfix = '?cb=' + uiNum;
			 wowElement = document.createElement ( 'script' );
			 wowElement.type = 'text/javascript';
			 wowElement.src = walkmeUrl+strUrlPostfix;
			 wowElement.innerHTML ='var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(walkme, s); window._walkmeConfig = {smartLoad:true}; })();'
			 myElements.appendChild ( wowElement );
        }

		function injectSalesForceLiveChat(liveChatKeys){
			if(SharedDataService.getAppSharedData().liveChatInjected ){
			     return;
			}
			//live chat codes
			var myElements = document.getElementsByTagName ( 'head')[ 0 ];
			var wowElement = null;
			if(liveChatKeys)
			{
				var code1 = liveChatKeys.init1;
				var code2 = liveChatKeys.init2;
				var code3 = liveChatKeys.online;
				var code4 = liveChatKeys.url1;
				var code5 = liveChatKeys.url2;
			}
			gso.getAppConfig().liveChatCodeForHtml = code3;
			//---------
			gso.getAppConfig().trinetLiveChat = liveChatKeys;
			liveagent.addCustomDetail("Emp ID", gso.getAppConfig().userId);
			liveagent.findOrCreate("Contact").map("Employee_ID__c", "Emp ID", true,true,false);
			liveagent.setName(gso.getAppConfig().username);
			// -----------------
			liveagent.addCustomDetail("LiveChat Field", gso.getAppConfig().companyId ?gso.getAppConfig().companyId :"");
            liveagent.findOrCreate("Contact").map("Client_ID_for_Live_Chat__c", "LiveChat Field", true,true,false);

			//------------------
			wowElement = document.createElement ( 'script' );
			wowElement.type = 'text/javascript';
			wowElement.innerHTML = "liveagent.init('https://"+code5+"/chat', '"+code1+"', '"+code2+"')";
			myElements.appendChild ( wowElement );
			// -----------------
			wowElement = document.createElement ( 'script' );
			wowElement.type = 'text/javascript';
			wowElement.innerHTML = "if (!window._laq){window._laq = []; }" +
				"window._laq.push(function(){" +
				"liveagent.showWhenOnline('"+code3+"', document.getElementById('liveagent_button_online_"+code3+"'));" +
				"liveagent.showWhenOffline('"+code3+"', document.getElementById('liveagent_button_offline_"+code3+"'));" +
				"});"
			myElements.appendChild ( wowElement );
			SharedDataService.getAppSharedData().liveChatInjected = true;
		}

		function validateOpenAMTokenForAllSessions()
		{
			/*
				Use case
				1. should prompt for new credential when a user logs in after closing the browser window
				   OpenAM is still valid after closing the browser.
				2. User cannot skip MFA by typing a URL in another tab or opening a window
				3. Ensure to start with a valid session ( openam, Legacy, Weblogic )
				4. Should allow switching betweeen Legacy and GS
				5. Should allow switching between Empl and Admin view
				6. Should allow reloading or back button

				// check if token id is same as person_security table
				// This check should be removed once we decommision seeker/Web logic apps
				Local dev : in bib, config.json,  set the flag to false
				validateAllSessions : false
			*/

			var msvConfig = DS.get('microservices-config','0');
			var trinetGatewayAPIEndPoint = "/trinetgateway/api/mfa/services/v1.0/user/" + gso.getAppConfig().personId + "/personsecurity";

			if ( msvConfig != null && msvConfig.validateAllSessions !== undefined && msvConfig.validateAllSessions != null && msvConfig.validateAllSessions ) {
         DS.find('hrpsession-services', '',{ endpoint: trinetGatewayAPIEndPoint }).then(function (results) {
					// Weblogic must have
					if ( gso.getUtilService().getCookie() ==  results.encryptedSession) {
						// We cannot have gso in util service, so signoff weblogic
						// Which update person security table
						hrpSignOnService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie());
					} else {
						$window.sessionStorage.setItem('firstTimeLogin', true);
					}
				}).catch(function(error) {
					hrpSignOnService.logout(gso.getAppConfig().companyId, gso.getAppConfig().personId, gso.getUtilService().getCookie());
					console.log('Check all sessions:error is' + error);
				});
			}

		}

		/*Employee Details Fetching*/
		function empDetails() {
			DS.find('emp-details', '').then(function (results) {
				SharedDataService.getAppSharedData().countryCode = results.workCountryCd;

        gso.getAppConfig().countryCode = results.workCountryCd;
				gso.getAppConfig().pfClient = results.pfClient;
				gso.getAppConfig().designation = results.posDesc;
				gso.getAppConfig().stateCode = results.workState;
				gso.getAppConfig().username = results.name;
				gso.getAppConfig().holidaySchedule = results.holidaySchedule;
				gso.getAppConfig().employmentStatus = results.emplymntStatus;
				$window.sessionStorage.setItem('hs', results.holidaySchedule);
				gso.getAppConfig().empStatus = results.emplymntStatus;
				gso.getAppConfig().workCity = results.workCity;
        gso.getAppConfig().positionId = results.positionId;
		gso.getAppConfig().emplRcd = results.emplRcd;
		if(ctrl.msvConfig) {
			injectSalesForceLiveChat(ctrl.msvConfig.trinetLiveChat);
		}
        if (results.firstName !== null && results.lastName !== null) {
					ctrl.monogram = results.firstName.trim().charAt(0).toUpperCase() + results.lastName.trim().charAt(0).toUpperCase();
				}
				$scope.$broadcast('holidaySchedule', gso.getAppConfig().holidaySchedule);
				// use this flag to stop other api calls from firing before
				// 'empDetails' is loaded
				ctrl.empDetailsIsLoaded = true;
				localStorage.setItem('notFirstLogin',true);

				apiConfigService.execAll();
				Location.init();

				//Removed /api-cache/v1/cache/{companyId}/{empId}/post-warm for 404 reductions 
				
			}).catch(function(error) {
				console.log('error is'+error);
			});
		}
	
		function identifyIEBrowser(){
			ctrl.browserData = deviceDetector;
			if(deviceDetector.browser.toUpperCase() === "IE" && deviceDetector.browser_version.split(".")[0] <= 10)
			{
				ctrl.browserIE = true;
			}
		}
		// ToDo: Modal pop-up for event Driven Notices
		 function openEventDriveNoticesModal(){
                var modal = $uibModal.open({
                    template  : '<tn-browser-modal></tn-browser-modal>',
                    component : 'tnBrowserModal',
                    windowClass : 'tn-browser-model',
                    resolve   : {
                        data: function() { return ctrl.noticeEventResult; }
                    }
                });

           return modal.result;
        }

		function getBetaPreference(){
			var betaPrefObject = null;

			DS.findAll('preferences').then(function (results) {
				betaPrefObject = results.filter(function(d) {
					return d.preferenceType === "BETA_PREF";
				});
				if (betaPrefObject.length === 0){ // if no betaPref, then open the modal for user to select
					openBetaPreferencesModal();
				}
				else { // if betapPref, then pass to function that checks for admin or wse view preference
					getPreferences(betaPrefObject[0].preferenceValue);
					DS.find('notices-event','').then(function(results){
                        ctrl.noticeEventResult = results.res;
                        ctrl.noticeEventResult.length > 0 ? openEventDriveNoticesModal(ctrl.noticeEventResult) : angular.noop();
                    });
				}
			}).catch(function(error) {
				if (error.status === 404	) { // if error - no preferences found, open modal
					openBetaPreferencesModal();
				}
				return null;
			});
		}

		function openBetaPreferencesModal() {
			var modalInstance = $uibModal.open({
				template: '<tn-login-to-beta-modal></tn-login-to-beta-modal>',
				component: 'tnLoginToBetaModal',
				resolve: {
					modalData: function() {
						return ctrl.dataForModal;
					}
				}
			});
			// when closing the beta pref modal, it returns users beta selection (or no selection)
			modalInstance.result.then(function (betaPref) { // then pass that value to function that checks for admin/EE view preference
				if (betaPref.preferenceValue !== ''){
					getPreferences(betaPref.preferenceValue);
				}
			});
		}

		function getPreferences(betaPref){
			var viewAdminPrefObject = null;
			var suppressRedirectModal = null;
			// only invoke the modal if we can get value of gso.getAppConfig().canViewAdminScreen via rootScope menuLoad
			// which is executed and evaluated in tn-header-bar.component.js

			DS.findAll('preferences').then(function (results) {
				viewAdminPrefObject = results.filter(function(d) {
					return d.preferenceType === "VW_PREF_ADMIN";
				});
				suppressRedirectModal = results.filter(function(d) {
					return d.preferenceType === "THIRD_PARTY_MODAL_HIDE";
				});

				if (suppressRedirectModal !== null && suppressRedirectModal.length > 0) {
					SharedDataService.getAppSharedData().suppressRedirectModal = (suppressRedirectModal[0].preferenceValue === 'Y') ? true : false;

				}
				if (gso.getAppConfig().canViewAdminScreen !== undefined) {
					checkToLaunchModal(viewAdminPrefObject.length, betaPref);
				}
				else {
					$rootScope.$on('menuLoad', function() {
						gso.getAppConfig().canViewAdminScreen =  utilService.checkForAdminView();
						checkToLaunchModal(viewAdminPrefObject.length, betaPref);
					});
				}
			}).catch(function(error) {
				return null;
			});
		}

		function checkToLaunchModal(viewAdminPrefObjLength, betaPref){
			if (viewAdminPrefObjLength === 0 && gso.getAppConfig().canViewAdminScreen === true && betaPref === 'Y' && !isEmployeeTerminated()){
				var switchViewModalViewedAndClosed = $window.sessionStorage.getItem('switchViewModalViewedAndClosed');
				if (switchViewModalViewedAndClosed !== null && switchViewModalViewedAndClosed !== undefined){
					if (switchViewModalViewedAndClosed === false){
						openSwitchViewModal();
					}
				}
				else {
					openSwitchViewModal();
				}

			}
		}

		function openSwitchViewModal() {
			var modalInstance = $uibModal.open({
				template: '<tn-switch-view-modal></tn-switch-view-modal>',
				component: 'tnSwitchViewModal',
				backdrop: 'static',
				resolve: {
					modalData: function() {
						return ctrl.dataForModal;
					}
				}
			});
			modalInstance.result.then(function () { // then pass that value to function that checks for admin/EE view preference
				$window.sessionStorage.setItem('switchViewModalViewedAndClosed', true);
			});
		}

		function openEformsAcknowledgementModal() {
			var modalInstance = $uibModal.open({
				template: '<tn-eforms-acknowledgement-modal></tn-eforms-acknowledgement-modal>',
				component: 'tnEformsAcknowledgementModal',
				backdrop: 'static',
				resolve: {
					modalData: function() {
						return ctrl.dataForModal;
					}
				}
			});
			modalInstance.result.then(function () { // then pass that value to function that checks for admin/EE view preference
				$window.sessionStorage.setItem('switchViewModalViewedAndClosed', true);
			});
		}


		function checkEformsAcknowledgements(){

			var acknowledgementObject = null;

			DS.find('eforms-acknowledgement','').then(function (results) {
				acknowledgementObject = results.eforms_data.filter(function(d) {
					return d.formStatus !== "Accepted";
				});

				if (acknowledgementObject.length > 0) {
					openEformsAcknowledgementModal();
				}
			}).catch(function(error) {
				return null;
			});
		}

		function isEmployeeTerminated(){
			var isTerminated = false;
			if (gso.getAppConfig().employmentStatus !== 'T' || gso.getAppConfig().employmentStatus !== 'D' || gso.getAppConfig().employmentStatus !== 'U'){
				isTerminated = true;
			}
			return isTerminated;
		}

		$rootScope.$on("onboardingStartToggle", function(event,data){
			ctrl.onboardingTaskId = data.taskId
		});
		$rootScope.$on("onboardingUpdateTask", function(event,data){
			if (ctrl.onboardingTaskId == data.taskId){
				DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: data.taskId, date: ""} });
			}
		});
	}
