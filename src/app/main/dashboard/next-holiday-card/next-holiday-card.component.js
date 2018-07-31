'use strict';

require('./next-holiday-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/next-holiday-card/next-holiday-card.component.html',
	controller: ['$scope', 'DS', 'moment', 'gso','$window',NextHolidayCardController]
}

/* @ngInject */
function NextHolidayCardController($scope, DS, moment, gso,$window) {
	var ctrl = this;
	ctrl.$onInit = function () {
		var token  = gso.getUtilService().getCookie();
		DS.find('activeHolidayCompany','',{
			headers: {
				'Authorization':'Bearer '+ token,
				'X-Company-ID': gso.getAppConfig().companyId,
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.then(function(response) {
			ctrl.activeCompany= response.isActive;
			loadWidget();
		})
		.catch(function(err) {
			ctrl.showSpinner = false;
			ctrl.hasHolidayWidget = false;
			//loadWidget();// we do not want to add loadWidget unless we know if we need to use new service or old service
		});

		ctrl.showSpinner = true;

		function loadWidget(){
			if(ctrl.activeCompany){
					loadNewHolidayWidget();
				}else{
					if (gso.getAppConfig().holidaySchedule !== "") {
						loadHolidayWidget();
					}else {
						$scope.$parent.$on('holidaySchedule', function () {
							loadHolidayWidget();
						});
					}
				}
			}
		}

		function loadHolidayWidget() {
			DS.find('holiday','').then(function(response) {

				//ToDo: This is to  sort the array dates so that next future date appear first
				var today = Date.now();

				var allDates = response.companyHolidayDetails.map(function(holiday) {
					return moment(holiday.date).utc();
				});

				var FutureDates= allDates.filter(function(input){ return input> today;});

				if (FutureDates) {
					ctrl.nextHolidayDt = new Date(Math.min.apply(null,FutureDates));
					ctrl.hasHolidayWidget = true;
				}
				else{
					ctrl.hasHolidayWidget = false;
				}
				ctrl.showSpinner = false;
			}).catch(function(err) {
				ctrl.showSpinner = false;
			});
		}

    function loadNewHolidayWidget() {
				var year = new Date().getFullYear();
				DS.find('newHoliday-list','',{
					headers: {
						'Authorization':'Bearer '+ gso.getUtilService().getCookie(),
						'X-Company-ID': gso.getAppConfig().companyId,
						'Content-Type': 'application/json;charset=UTF-8'
					},
					params : {
						year: year
					}
				})
				.then(function(response) {
					var today = Date.now();
					var allDates = response.holidayDetails.map(function(holiday) {
						return moment(holiday.holidayDate).utc();
					});

					var FutureDates= allDates.filter(function(input){ return input> today;});
					if (FutureDates && FutureDates.length > 0) {
						ctrl.nextHolidayDt = new Date(Math.min.apply(null,FutureDates));
						ctrl.hasHolidayWidget = true;
					}
					else{
						ctrl.hasHolidayWidget = false;
					}
					$window.sessionStorage.setItem('holidayList', allDates);
					ctrl.showSpinner = false;
				})
				.catch(function(err) {
					console.log(err);
					ctrl.showSpinner = false;
					ctrl.hasHolidayWidget = false;
				});
    }

  }
