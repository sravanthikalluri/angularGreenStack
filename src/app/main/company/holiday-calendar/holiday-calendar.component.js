'use strict';

require('./holiday-calendar.component.scss');

module.exports = {
	templateUrl: 'app/main/company/holiday-calendar/holiday-calendar.component.html',
	controller: ['DS', '$window','$filter',  'constants', 'moment', 'gso', '$http',HolidayCalendarController]
};

/* @ngInject */
function HolidayCalendarController (DS, $window,$filter, constants, moment, gso, $http) {
	var ctrl = this;
	var currentYear = new Date().getFullYear();
	ctrl.years = [{}, {}, {}];
	ctrl.years.map(function (obj, index) {
		obj.key = new Date().getFullYear() + index;
		obj.value = new Date().getFullYear() + index;
		return obj;
	});
	/*holiday-calendar-select*/
	ctrl.selectedObject = ctrl.years[0];
	ctrl.style = {'width' :'80px'};

	ctrl.date = new Date();

	var getHolidayList = function (selectedYear) {
		ctrl.showSpinner = true;
		DS.find('holiday', '', {
			params: {
				year: selectedYear
			}
		}).then(function(response) {
			var today = Date.now();
			ctrl.data = [];
			ctrl.errorMessage = null;
			response.companyHolidayDetails.sort(function(a,b) {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			});
			var nextHoliday =response.companyHolidayDetails.map(function(holiday) {
				return moment(holiday.date).utc();
			}).filter(function(d) {
				return d > today;
			}).filter(function(dd){
				return dd.hours !== 0;
			})[0];

			if(nextHoliday){
				response.companyHolidayDetails.map(function(holiday) {
					var obj = {};
					obj.date = holiday.date;
					obj.desc = holiday.desc;
					return obj;
				}).filter(function(obj){
					if(nextHoliday._i === obj.date){
						var today = new Date();
						var difference = moment(obj.date).diff(moment(today.toDateString()).utc());
						var numberOfMilliseconds = 24*60*60*1000;
						var days = Math.floor(difference/numberOfMilliseconds);
						if(days === 1){
							obj.up_coming = 'Upcoming - 1 Day';
							ctrl.data.push(obj);
						}
						else if(days === 0){
							obj.up_coming = 'Today';
							ctrl.data.push(obj);
						}
						else{
							obj.up_coming = 'Upcoming - '+days+' Days';
							ctrl.data.push(obj);
						}
					}
					else{
						ctrl.data.push(obj);
					}
				});
				ctrl.showSpinner = false;
			} else {
				ctrl.showSpinner = false;
			}
		}).catch(function(err) {
			ctrl.data = [];
			ctrl.errorMessage = err.data._error.message;
			ctrl.showSpinner = false;
		});
	};


	var getNewHolidayList = function (selectedYer) {
			DS.find('newHoliday-list','',{
				headers: {
					'Authorization':'Bearer '+ gso.getUtilService().getCookie(),
					'X-Company-ID': gso.getAppConfig().companyId,
					'Content-Type': 'application/json;charset=UTF-8'
				},
				params : {
					year: selectedYer
				}
			})
			.then(function(response) {
				var today = Date.now();

				ctrl.data = [];
				ctrl.errorMessage = null;
				ctrl.holidayResponse = response;

				response.holidayDetails.sort(function(a,b) {
					return new Date(a.holidayDate).getTime() - new Date(b.holidayDate).getTime();
				});

				var nextHoliday =response.holidayDetails.map(function(holiday) {
					return moment(holiday.holidayDate).utc();
				}).filter(function(d) {
					return d > today;
				}).filter(function(dd){
					return dd.hours !== 0;
				})[0];

				var floatingHoliday = response.holidayDetails.filter(function(holiday){ return holiday.holidayDate === null;});
				if(!nextHoliday && !floatingHoliday){
					//ctrl.showSpinner = false;
					ctrl.errorMessage = "Holiday Calendar not yet available";
					return;
				}

				response.holidayDetails.map(function(holiday) {
					var obj = {};
					obj.date = holiday.holidayDate;
					obj.desc = holiday.descr;
					if(holiday.descr === "Flexible Floating Holiday"){
						ctrl.ffhHours = holiday.hrs;
					}
					return obj;
				})
				.filter(function(obj){
					if(nextHoliday){
						if(nextHoliday._i === obj.date){
							var today = new Date();
							var difference = moment(obj.date).diff(moment(today.toDateString()).utc());
							var numberOfMilliseconds = 24*60*60*1000;
							var days = Math.floor(difference/numberOfMilliseconds);
							if(days === 1){
								obj.up_coming = 'Upcoming- 1 Day';
								ctrl.data.push(obj);
							}
							else if(days === 0){
								obj.up_coming = 'Today';
								ctrl.data.push(obj);
							}
							else{
								obj.up_coming = 'Upcoming- '+days+' Days';
								ctrl.data.push(obj);
							}
						}
						else{
							floatingHolidays(obj);
							ctrl.data.push(obj);
						}
					}
					else{
						floatingHolidays(obj);
						ctrl.data.push(obj);
					}
					ctrl.showSpinner = false;
				});

			})
			.catch(function(err) {
				console.log(err);
				ctrl.showSpinner = false;
			});
	}

	var floatingHolidays = function (obj) {
		if (obj.desc === "Anniversary Floating Holiday") {
			obj.date = "Available in the week of your work anniversary";
		} else if (obj.desc === "Birthday Floating Holiday") {
			obj.date = "Available in the week of your birthday";
		} else if (obj.desc === "Flexible Floating Holiday") {
			obj.date = ctrl.ffhHours + " hours to be taken anytime this year";
		}
	}

	ctrl.$onInit = function () {
		ctrl.label =  $filter('translate')("holiday-calendar-select");
		ctrl.selectedYear = ctrl.selectedObject.key;
		loadHolidayData(ctrl.selectedYear);
	};

	var loadHolidayData = function(selectedYear){
		var token  = gso.getUtilService().getCookie();
		DS.find('activeHolidayCompany','',{
			headers: {
				'Authorization':'Bearer '+ token,
				'X-Company-ID': gso.getAppConfig().companyId,
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.then(function(response) {
			ctrl.activeHolidayCompany = response.isActive;
			if(ctrl.activeHolidayCompany){
				getNewHolidayList(selectedYear);
				//also call the customMessage service - this should get included in the same call but
				//we have separate call right now
				getCustomMessage();

			}else{
				getHolidayList(selectedYear)
			}
		})
		.catch(function(err) {

		});
	}
	ctrl.holidayListOpen = function(){
		if(ctrl.activeHolidayCompany){
			downloadNewHolidayList();
		}else{
			downloadHolidayList();
		}
	}
	var getCustomMessage = function(){
		DS.find('holiday-custom-message','',{
			headers: {
				'Authorization':'Bearer '+ gso.getUtilService().getCookie(),
				'X-Company-ID': gso.getAppConfig().companyId,
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.then(function (results) {
			ctrl.customMessage = results.customMessage;
		}).catch(function(error) {
			console.log('error is'+error);
		});
	}
	ctrl.b64toBlob=function(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		  var slice = byteCharacters.slice(offset, offset + sliceSize);

		  var byteNumbers = new Array(slice.length);
		  for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		  }

		  var byteArray = new Uint8Array(byteNumbers);

		  byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	  }
	ctrl.changeYear = function (year) {
 		ctrl.selectedYear = year.key;
		ctrl.selectedObject = year;
		if(ctrl.activeHolidayCompany){
			getNewHolidayList(year.key);
		}else{
			getHolidayList(year.key)
		}
	};

	var downloadHolidayList = function(year){
		DS.find('holiday-list', '', {
			params: {
				year: ctrl.selectedObject.key
			}
		}).then(function (results) {
			ctrl.pdfData =  constants.docLocContext + results.url;
			$window.open(ctrl.pdfData, '_blank');
		}).catch(function(error) {
			console.log('error is'+error);
			if(error.status == "404") {
				var holidayData = { 
					"CompanyName" :gso.getAppConfig().companyName ,
					"printDescription" :ctrl.selectedObject.key+ " Holidays"
				};
			    gso.getUtilService().printSection('holidaysSection');
			}
		});
	};

	var downloadNewHolidayList = function(year){
		var token	= gso.getUtilService().getCookie();
		var url 	= '/api-company-holiday-calendar/v1/holidaycalendar/' + gso.getAppConfig().companyId + '/Y/'+ ctrl.selectedObject.key +'/holidays';
		var requestPayload = {
  				"templateId": "holidays",
					"request": {
						"holidays": {
							"holidayDetails": ctrl.holidayResponse.holidayDetails,
							"year": ctrl.selectedObject.key,
							"companyName": gso.getAppConfig().companyName,
							"customMessage": ctrl.customMessage,
							"view": ctrl.holidayResponse.view,
							"eligibility": 'All Regular Employees',
							"totalHolidays": ctrl.holidayResponse.totalHolidays
						}
					}
				};
			$http({
					url: url,
					method : 'POST',
					data : requestPayload,
					headers : {
						 responseType: 'arraybuffer',
						 'Authorization':'Bearer '+ token,
						 'X-Company-ID': gso.getAppConfig().companyId,
						 'Content-Type': 'application/json;charset=UTF-8'
					 }
				})
				.success(function (res) {
					var prntWin;
					var trident = window.navigator.userAgent.indexOf('Trident/');
					var edge = window.navigator.userAgent.indexOf('Edge/');
					if (trident > 0 || edge > 0) {
						debugger;
						if (window.navigator.msSaveBlob) {
							var blob = ctrl.b64toBlob(res, 'application/pdf', 512);
							window.navigator.msSaveBlob(blob, "holidays.pdf");
						}
					} else {
						var file = "data:application/pdf;base64," + res;
						prntWin = window.open("", "", "width=1500,height=750");
						prntWin.document.write("<html><head><title>Holiday Schedule</title></head><body>"
							+ '<embed width="1500" height="750" name="plugin" src="' + file + '" '
							+ 'type="application/pdf" internalinstanceid="21"></body></html>');
					}

				}).error(function (data, status) {
					console.log("Data", data, data._statusCode, data._statusMessage);
					console.log("Status", status);
					ctrl.errorAlert = {
						_statusCode: data._statusCode,
						_statusMessage: data._error.message
					}
				});

		/*DS.create('new-holiday-list-export', data, {
			headers: {
				'Authorization':'Bearer '+ token,
				'X-Company-ID': gso.getAppConfig().companyId,
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.then(function (results) {
			ctrl.pdfData =  constants.docLocContext + results.url;
			$window.open(ctrl.pdfData, '_blank');
		}).catch(function(error) {
			console.log('error is'+error);
		});*/
	};
}
