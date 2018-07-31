'use strict';
module.exports = utilService;
/* @ngInject */
function utilService ($filter,constants,sharedProperties, moment,$window, DS, SharedDataService, $timeout) {
    return {
        /* To Filter next day date into "yyyy-MM-dd". */
        filterNextDayDate: function () {
            return $filter('date')(new Date().setDate(new Date().getDate() + 1),
                'yyyy-MM-dd');
        },
		filterNextEffectiveDate: function () {
			var effectiveDate = this.convertToServerTimeZone(new Date().setDate(new Date().getDate() + 1));
			return $filter('date')(new Date(effectiveDate), 'yyyy-MM-dd');
		},
		filterCurrentEffectiveDate: function () {
			var effectiveDate = this.convertToServerTimeZone(new Date());
			return $filter('date')(new Date(effectiveDate), 'yyyy-MM-dd');
		},
		filterCurrentDate: function () {
			return $filter('date')(new Date(),'yyyy-MM-dd');
		},
        getStandardDate : function(date){
            var sDateArray = date.split('-');
            return new Date(sDateArray[0],sDateArray[1] - 1,sDateArray[2]);
        },
        /* To Filter today date in "yyyy-MM-dd" format.*/
        filterToDayDate: function () {
            return $filter('date')(new Date().setDate(new Date().getDate()),
                constants.dateFormat);
        },
        /* To Filter date into required format. */
        filterDate: function (date, format) {
            return $filter('date')(date, format);
        },
		/* Id's preparation for components*/
		compIdGen: function (text, type) {

			return text.charAt(0).toLowerCase() + text.replace(/[^A-Z0-9]/ig, "").slice(1) + type;
		},
		/* To check date's effective for History Timeline. */
        effectiveDateCheck: function (data) {
            angular.forEach(data, function (input, i) {
                var date = '';
                if (angular.isDefined(input.effDate)) {
                    date = input.effDate;
                } else {
                    date = input.effectiveDate;
                }
                if (input.effDate && input.effDate.indexOf('Effective') !== -1) {
                    date = input.effDate.replace(/Effective/g, '');
                }
                var leftHand = $filter('date')(new Date(), 'MM-dd-yyyy');
                var arr = (date.indexOf('/') !== -1) ? date.split('/') : date.split('-');
                var rightHand = $filter('date')(new Date(arr[0], arr[1] - 1, arr[2]), 'MM-dd-yyyy');
                var checkTwoDates = function (date1, date2) {
                    if (date1 !== 'Invalid Date' && date2){
                        date1 = date1.split('-');
                        date2 = date2.split('-');
                        date1 = new Date(parseInt(date1[2], 10), (parseInt(date1[0], 10) - 1), date1[1]);
                        date2 = new Date(parseInt(date2[2], 10), (parseInt(date2[0], 10) - 1), date2[1]);
                        return date1 > date2;
                    }
                };
                if (checkTwoDates(rightHand, leftHand)) {
                    date = $filter('date')(date, constants.dateFormatUS);
                    data[i].effDate = constants.effective + date;
                    data[i].label = constants.on;
                } else {
                    date = $filter('date')(date, constants.dateFormatUS);
                    data[i].effDate = constants.effective + date;
                    data[i].label = constants.since;
                }
            });
            return data;
        },

        checkTwoDates: function (date1, date2) {
            date1 = date1.split('-');
            date2 = date2.split('-');
            date1 = new Date(parseInt(date1[0], 10), (parseInt(date1[1], 10) - 1), date1[2]);
            date2 = new Date(parseInt(date2[0], 10), (parseInt(date2[1], 10) - 1), date2[2]);
            return date1 >= date2;
        },
        /* To sort any object array in descending order by effective date. */
        sortData: function (data, asc) {
            data.sort(function (a, b) {
                if (!angular.isDefined(a.effectiveDate)) {
                    return new Date(b.effDate).getTime() - new Date(a.effDate).getTime();
                } else {
                    if (asc) {
                        return new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime();
                    }
                    return new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime();
                }
            });
            return data;
        },

        /* To check email valid pattern. */
        // emailValidity: function (emailLength) {
        //     for (var i = 0; i <= emailLength; i++) {
        //         var value = angular.element('#email_' + i).val();
        //         var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        //         if (value === undefined) {
        //             return false;
        //         }
        //         if (!pattern.test(value)) {
        //             return false;
        //         }
        //     }
        //     return true;
        // },

        // as emailValidity function has not  been used anywhere and above function is not completely validating the email format. So, re-writing it as below
        emailValidity: function (emailLength) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var isValidEmail = false;

            if (emailLength) {
              if (emailLength.match(mailformat)) {
                isValidEmail  = true;
              }
            }
            return isValidEmail;
        },

        // Function to check the current date in between Dates
          todayBtnTwoDates: function (today,effectiveDate, planYearDate) {
             /* var date2 = effectiveDate.split('-');
			  var date1 = planYearDate.split('-');
              date1 = new Date(date1[2], parseInt(date1[1],10)-1, date1[0]); // -1 because months are from 0 to 11
              date2 = new Date(date2[2], parseInt(date2[1],10)-1, date2[0]);*/
              return effectiveDate <= today  && today <= planYearDate;
           },

        /* To check phone valid pattern. */
        phoneValidity: function (start, phoneLength) {
            for (var i = start; i <= phoneLength; i++) {
                var value = angular.element('#phone_' + i).val();
                var pattern = /^[0-9]{3}.[0-9]{3}.[0-9]{4}$/;
                if (value === undefined) {
                    return false;
                }
                if (!pattern.test(value)) {
                    return false;
                }
            }
            return true;
        },

        /* To hide/show delete button. */
        showHideDelete: function (label) {
            var result = {};
            if (label && label.effDateLabel === constants.currentlyEffective) {
                result.hideDelete = true;
            } else {
                result.hideDelete = false;
            }
            return result;
        },
        showHideeDelete: function (id) {
            var result = {};
            result.index = angular.element(id).val();
            if (result.index === "0") {
                result.hideDelete = true;
            } else {
                result.hideDelete = false;
            }
            return result;
        },
        /* To iterate REST call errors. */
        filedErrorIterator: function (object) {
            var messageAlert = "";
            if (object.length === 1) {
                messageAlert = messageAlert.concat(object[0].message);
            } else {
				var resArr = [];
				object.filter(function(item){
					var i = resArr.findIndex(function (x) {
						return x.message === item.message;
					});
					if(i <= -1) {
						resArr.push(item);
					}
				});
                angular.forEach(resArr, function (input, i) {
                    messageAlert = messageAlert.concat(i + 1 + ". " + input.message + "\n");
                });
            }

            return messageAlert;
        },
        /* For null check of any value. */
        isNull: function (data) {
            if (data === null || data === '') {
                return true;
            }
            return false;
        },
        /* To change phone number format. */
        changePhoneFormat: function (phoneNumber) {
            return phoneNumber.substr(0, 3) + "-" + phoneNumber.substr(3, 3) + "-" + phoneNumber.substr(6, 4);
        },
        isDefined: function (trueValue, falseValue) {
            if (typeof trueValue !== 'undefined' && typeof trueValue !== 'object') {
                return trueValue;
            } else {
                return falseValue;
            }
        },
        getAngularElementById: function (idName) {
            return angular.element(document.querySelector('#' + idName));
        },
        getAngularElementByClass: function (className) {
            return angular.element(document.querySelectorAll('.' + className));
        },

        toggleDIV: function (divId, isShow) {
           this.getAngularElementById(divId).hidden = isShow;
        },
        hideDIVS: function (allHide) {
            if (allHide) {
                this.getAngularElementByClass('menu-main').hide();
                this.getAngularElementByClass('header').hide();
                this.getAngularElementByClass('container-content').css("width", "100%");
                this.getAngularElementByClass('container-content').css("height", "564px");
            }
        },
        getCookie: function () {
            // read from an external file to support OpenStack

            var cookieName = "";
            if ( SharedDataService.getAppSharedData().cookieName != null ) {
                cookieName = 	SharedDataService.getAppSharedData().cookieName;
            }

          //  console.log("Get Cookie name=" + cookieName);
            // Uncomment the below code snippet if you want to run the app using AWS
             /*if (document.location.hostname.startsWith("local")) {
             cookieName = cookieName + 'GS';
             }*/
            var re = new RegExp(cookieName + "=([^;]+)");
            var value = re.exec(document.cookie);
            return (value !== null) ? value[1] : null;
        },
        splitSubComponentsPermissions : function(selectedMenuComponentPermissions){
            if (selectedMenuComponentPermissions && selectedMenuComponentPermissions.length > 0) {
                var temp = [];
                angular.forEach(selectedMenuComponentPermissions, function (selectedMenu) {
                    var subComponents = selectedMenu.subComponents;
                    angular.forEach(subComponents,function(obj){
                        temp.push(obj);
                    });
                });
                return selectedMenuComponentPermissions.concat(temp);
            }

        },
        toggleView : function(type,name,canView){
            var ele = angular.element(document.querySelectorAll(type + name));
            if (canView) {
                if(ele.hasClass('ng-hide')){
                    ele.removeClass('ng-hide').addClass('ng-show');
                }else{
                    ele.addClass('ng-show');
                }
            } else {
                if(ele.hasClass('ng-show')){
                    ele.removeClass('ng-show').addClass('ng-hide');
                }else{
                    ele.addClass('ng-hide');
                }
            }
        },

        toggleComponentPermissions: function (selectedMenuComponentPermissions,index) {
            var $this = this;
            if (selectedMenuComponentPermissions && selectedMenuComponentPermissions.length > 0) {
                angular.forEach(selectedMenuComponentPermissions, function (selectedMenu) {
                    if (typeof index !== 'undefined') {
                        $this.toggleView('#',selectedMenu.name+'_'+index,selectedMenu.permission.canView);
                        $this.toggleView('.',selectedMenu.name+'_'+index,selectedMenu.permission.canView);
                    }else{
                        $this.toggleView('#',selectedMenu.name,selectedMenu.permission.canView);
                        $this.toggleView('.',selectedMenu.name,selectedMenu.permission.canView);
                        if(selectedMenu.subComponents.length > 0){
                        	angular.forEach(selectedMenu.subComponents,function (selectedSubMenu){
								$this.toggleView('#',selectedSubMenu.name,selectedSubMenu.permission.canView);
                                $this.toggleView('.',selectedSubMenu.name,selectedSubMenu.permission.canView);
                        	});
                        }
                    }

                    //$this.toggleEdit(selectedMenu.name,selectedMenu.permission.canEdit);
                });
            }
        },
        showDIVS: function (allShow) {
            this.getAngularElementById('me').hidden = false;
            this.getAngularElementById("company").hidden = false;

            if (allShow) {
                this.getAngularElementByClass('menu-main').hidden = false;
                this.getAngularElementByClass('header').hidden = false;
            }
        },
        setSidebarActive: function (sidebar) {
            this.removeTitle();
            this.getAngularElementById(sidebar).addClass('title-block-active');
        },
        removeTitle: function () {
            this.getAngularElementByClass('title-block').removeClass('title-block-active');
        },

        printSection: function (id,printData) {
            var pw = window.open('', 'printGrid');
            var contents = this.getAngularElementById(id).html();
            pw.document.write('<html> <head>');
            pw.document.write('<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />');
            pw.document.write('<style>');
            pw.document.write('h2 { font-family: Helvetica; font-size: 18px; color: #0073cf; font-style: Semi Bold;}');
            pw.document.write('table {border: 1px solid;width: 100%;text-align: left;font-size: 11px;font-family: arial;border-collapse: collapse;}');
            pw.document.write('table th {padding: 4px 3px 4px 5px;border: 1px solid #d0d0d0;border-left-color: #eee;background-color: #ededed;}');
            pw.document.write('table td {padding: 4px 3px 4px 5px;border-style: none solid solid;border-width: 1px;border-color: #ededed;}');
            pw.document.write('.holiday-calendar-table {display: table; width: 100%;padding: 25px 5px;  border-bottom: 1px solid #f4f4f4; font-size: 20px; color: #242936;}.holiday-calendar-table p{display: table-cell; width: 50%;}');
            pw.document.write('.holiday-calendar-table-chip {border-radius: 5px;color: #fff;font-weight: 600;}');
            pw.document.write('</style>');
            pw.document.write('<title>' + "Print" + '</title>');
            pw.document.write('</head>');
			pw.document.write('<body>');
			if(printData) {
				pw.document.write('<h3>'+printData.CompanyName+"   "+printData.printDescription+'</h3>');
			}
            pw.document.write(contents);
            pw.document.write('</body>');
            pw.print();
        },
        splitConcatDateString: function (nextCheckIssueDate) {
            var dateArray = nextCheckIssueDate.split('-');
            return dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0];
        },
        compareTwoDates: function (date1, date2) {
            // returns true if date1 is greater than or equal to date2.
            // date in the format of MM-dd-yyyy.
            date1 = date1.split('-');
            date2 = date2.split('-');
            date1 = new Date(parseInt(date1[2], 10), (parseInt(date1[0], 10) - 1), date1[1]);
            date2 = new Date(parseInt(date2[2], 10), (parseInt(date2[0], 10) - 1), date2[1]);
            return date1 >= date2;
        },
        weekDays: function (day) {
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            return weekday[day];
        },
        routeReloadTimeOut: function () {
           // $route.reload();
        },
        focusInvalidElement: function (formName) {
            var visibleInvalids = angular.element(formName).find('.ng-invalid:visible');
            if (angular.isDefined(visibleInvalids)) {
                angular.forEach(visibleInvalids, function (element) {
                    if (angular.element(element).hasClass('ng-valid-date')) {
                        angular.element(element).parent().addClass('error-warning');
                    } else {
                        angular.element(element).addClass('error-warning');
                    }
                });
            }
        },
        getNEStateIndex: function(taxWithHolingDataObject){
            var index = -1;
            angular.forEach(taxWithHolingDataObject,function(taxWithHolingData,$index){
                if(taxWithHolingData.type === 'State tax' && taxWithHolingData.payDedCode === 'NE'){
                    index = $index;
                }
            });
            return index;
        },
        getTilePanelHtml: function () {

            return '<div class="content-block no-pad tilePanel show"  id="panelContent">' +
                '<div class="policies-info-box policies-info-box-tiles-adjustment">' +
                '<div class="col-md-12 no-pad">' +
                '<button id="overviewClose" type="button" class="close" aria-label="Close" ng-click="closePanel($event)">' +
                '<span aria-hidden="true" class="icon-close-temp"></span>' +
                '</button>' +
                '</div>' +
                '<div class="clear-fix"></div>'+
                '<div class="panel-group" id="accordion">' +
                '<div class="panel panel-default">' +
                '<div id="collapseOne" class="panel-collapse collapse in">' +
                '<div class="panel-body panel-body-background general-notice">' +
                '<p class="blod">{{innerDataLoop.label}}</p>' +
                '<p class="blod">{{innerDataLoop.subdescription}}</p>' +
                '<ul class="no-pad default-cursor" id="loop">' +
                ' <li class="block default-cursor " ng-repeat="lang in innerDataLoop.language">' +
                '<a id="currBook{{$index}}" ng-href="{{lang.url | contentUrl }}" class="pull-left hand color-grey" target="_blank">' +
                '<span class="icon-icon_pdf marg-right-tab-5"></span>{{lang.label}}</a>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                ' </div>';
        },
        openSSOInNewWindow: function (ssoId) {
            window.open("ssoindex.html#/" + ssoId);
        },
        redirectToLogin: function () {
            window.location = window.location.pathname.substring(0, window.location.pathname.length - 1);
            window.location.reload(true);
        },
        clearAll : function () {
            this.clearStore();
            this.clearCookies();
        },
        clearStore : function () {
			localStorage.clear();
			$window.sessionStorage.clear();
        },
        clearCookies : function () {
            var cookieName = "";
            if ( SharedDataService.getAppSharedData().cookieName != null ) {
                cookieName = 	SharedDataService.getAppSharedData().cookieName;
                // Delete known cookies, Angular cookies remove does not work very well in all browsers.
                document.cookie = cookieName + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;path=/;domain=.hrpassport.com" ;
                //console.log("Deleted cookies");
            }

        },
        logout: function (isMessage) {

            // read external properties
            var gotoURL = SharedDataService.getAppSharedData().platformUrl;
            var ssoURL = SharedDataService.getAppSharedData().ssoUrl;

            // Bug in a login page,after ?, openAMLogin page does not read first parameter, so add dummy one
            // It works for legacy with no issues.
            //TODO add product info &product=""
            var logoutWithMessage = "";
            if ( isMessage ) {
                logoutWithMessage = "&logout=1";
            }
            gotoURL = escape(gotoURL + "?p=true" + logoutWithMessage );
            // Delete known cookies of hrpassport domain
            // You cannot delete other domain cookies
            this.clearAll();
            // Give some time for cookie deletions
            $timeout(function () {
                window.location =  ssoURL + "/auth/UI/Logout?realm=sw_hrp&goto="  + gotoURL ;
            }, 1000);
        },
        redirectToSSOLogout: function(){
			var gotoURL = document.location.hostname;

            /* For local development */
            if(gotoURL === 'greenstack.hrpassport.com'){
                gotoURL = 'platformbib.hrpassport.com'
            }
            /* End of local development */

            var url = SharedDataService.getAppSharedData().ssoUrl+'/auth/UI/Logout?goto=https://'+gotoURL+'&realm=sw_hrp&product=passport';
            window.open(url,"_self");
        },
		checkIfNavigationExists: function (parentName, childName) {
		  var navigationMenu = JSON.parse(SharedDataService.getAppSharedData().navigationSide);
      var navExists = false;

			if (navigationMenu !== undefined && navigationMenu !== null) {
				if (navigationMenu.length > 0) {
					var parentMenu = navigationMenu.filter(function (obj) {
						return obj.name === parentName;
					});

					if (parentMenu[0] !== undefined && parentMenu[0] !== null) {
						if (parentMenu[0].subMenus !== undefined && parentMenu[0].subMenus !== null) {
							var childMenuSubMenus = parentMenu[0].subMenus;

							var childMenu = childMenuSubMenus.filter(function (obj) {
								return obj.name === childName;
							});

							if (childMenu !== undefined && childMenu !== null) {
								if (childMenu.length !== 0) {
									navExists = true;
								}
								else {
									navExists = false;
								}
							}
							else {
								navExists = false;
							}
						}
					}
				}
			}
			return navExists;
		},
		checkForAdminView: function () {
			var navigationMenu = JSON.parse(SharedDataService.getAppSharedData().navigationSide);
			var checkForAdminView = false;

			if (navigationMenu !== undefined && navigationMenu !== null) {
				if (navigationMenu.length > 0) {
					var parentMenu = navigationMenu.filter(function (obj) {
						return obj.theme === 'Company' && obj.id !== 211;
					});
					if (parentMenu.length !== 0){
						checkForAdminView = true;
					}
				}
			}
			return checkForAdminView;
		},
        checkIfWidgetExists: function (parentName, childName) {
            var widgetMenu = sharedProperties.getWidgetInfo();
            var widgetExists = false;

            if (widgetMenu !== undefined && widgetMenu !== null) {
                if (widgetMenu.length > 0) {
                    var parentMenu = widgetMenu.filter(function (obj) {
                        return obj.name === parentName;
                    });

                    if (parentMenu[0] !== undefined && parentMenu[0] !== null) {
                        if (parentMenu[0].subMenus !== undefined && parentMenu[0].subMenus !== null) {
                            var childMenuSubMenus = parentMenu[0].subMenus;

                            var childMenu = childMenuSubMenus.filter(function (obj) {
                                return obj.name === childName;
                            });

                            if (childMenu !== undefined && childMenu !== null) {
                                if (childMenu.length !== 0) {
                                    widgetExists = true;
                                }
                                else {
                                    widgetExists = false;
                                }
                            }
                            else {
                                widgetExists = false;
                            }
                        }
                    }
                }
            }
            return widgetExists;
        },
        checkIfNavigationThemeExists: function (theme) {
            var navigationMenu = JSON.parse(SharedDataService.getAppSharedData().navigationSide);
            var themeExists = false;

            if (navigationMenu !== undefined && navigationMenu !== null) {
                if (navigationMenu.length > 0) {
                    var themeMenu = navigationMenu.filter(function (obj) {
                        return obj.theme === theme;
                    });
                    if (themeMenu !== undefined && themeMenu !== null) {
                        if (themeMenu.length !== 0) {
                            themeExists = true;
                        }
                        else {
                            themeExists = false;
                        }
                    }
                    else {
                        themeExists = false;
                    }
                }
            }
            return themeExists;
        },
        enableServiceValidation: function(method, restUrl){
            if(method !== constants.get){
                if(restUrl.contains('?')){
                    restUrl += '&enableValidation=true';
                }else{
                    restUrl += '?enableValidation=true';
                }
            }
            return restUrl;
        },
        sortArrayWithOtherAtBottom: function (arr) {
            var sortedArray,
                otherItem;
            sortedArray = $filter('orderBy')(arr, 'value');
            angular.forEach(sortedArray, function (input, index) {
                if(input.value === "Other") {
                    otherItem = sortedArray.splice(index, 1)[0];
                }
            });
            sortedArray.push(otherItem);
            return sortedArray;
        },
        convertToServerTimeZone: function (date){
            //EST
            var offset = constants[constants.timezone],
                clientDate;
            if (date) {
                clientDate = new Date(date);
            } else {
                clientDate = new Date();
            }

            var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
            var serverDate = new Date(utc + (3600000*offset));
            return moment(serverDate);
        },
		GetDateDiff: function (a, b){
			var MS_PER_DAY = 1000 * 60 * 60 * 24;
			var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
			var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
			var days = this.diffDays = Math.floor((utc2 - utc1) / MS_PER_DAY);
			return days;
		},
    	mockAccount : function(obj) {
		  var accountType = obj.accountType,
			  accountNumber = obj.accountNumber;

		   return accountType+'****' + accountNumber.substr(accountNumber.length - 4, accountNumber.length);
       },
	   setAlert: function(divId){
           this.getAngularElementById(divId).show();
	   },
       getLastPaycheckAmount : function(paychecks){
          var lastPayCheckAmount = 0;
			if (paychecks.checkSummaries && paychecks.checkSummaries.length !== 0) {
				lastPayCheckAmount = paychecks.checkSummaries[0].netPay;
			}

		 return lastPayCheckAmount;
       },
		getErrorMessages : function(data){
			var alert = null;
			if (data !== null) {
				if (data._statusCode === undefined && (status === 503 || status === 502)) {
					alert = {
						_statusCode: status,
						_statusMessage: data
					};
				}
				else if (data._statusCode === 500 || data._statusCode === 504 || data._statusCode === 401) {
					this.redirectToLogin();
				}
				else if (data._error.detailMessage !== undefined && data._error.detailMessage !== "" && data._error.detailMessage.fieldErrors) {
					alert = {
						_statusCode: data._statusCode,
						_statusMessage: this.filedErrorIterator(data._error.detailMessage.fieldErrors)
					};
				} else if (data._error.detailMessage !== undefined && data._error.detailMessage !== "") {
					alert = {
						_statusCode: data._statusCode,
						_statusMessage: data._error.detailMessage
					};
				}else {

					alert = {
						_statusCode: data._statusCode,
						_statusMessage: data._error.message
					};

				}

			}

			return alert;
		},
		checkForExceptionalEnv : function (env) {
			var urls = {
					"env": env,
					"betaURL": SharedDataService.getAppSharedData().platformUrl,
					"classicURL": SharedDataService.getAppSharedData().hrpUrl
				};
			if (env === 'sr' || env === 'lr' || env === 'bib' || env === 'qeb') {
				return urls;
			}

    },

     traverseJSON: function(menu, url, title){
			var maintitle;
			if(menu){
				for (var prop in menu) {
					var urls = menu[prop].url.split(",");
					if (urls == url){
						if(title === ''){
							maintitle = title + menu[prop].text;
						}else{
							maintitle = title + ' - ' +menu[prop].text;
						}
						if(urls.toString().indexOf("overview")!= -1){
							maintitle = maintitle + " - Overview";
						}
						break;
					}
					if(menu[prop].menus && typeof menu[prop] === "object"){
						var submenus = menu[prop].menus;
						maintitle = this.traverseJSON(submenus, url, menu[prop].text);
						if(maintitle){
							break;
						}
					}
				}
			}
			return maintitle;
		}

};
}
