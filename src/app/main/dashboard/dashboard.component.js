'use strict';

require('./dashboard.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/dashboard.component.html',
	controller: ['gso','$rootScope','sharedProperties', 'DS',
		DashboardController]
};
/* @ngInject */
function DashboardController(gso,$rootScope,sharedProperties,DS) {
	var ctrl = this;

	ctrl.$onInit = function () {

		if(sharedProperties.getWidgetInfo().length > 0){
			widgetLoad();
			if(ctrl.showAlerts){
				ctrl.getAlerts();
			}
		}else{
			$rootScope.$on('menuLoad', function(e, data) {
				widgetLoad();
				if(ctrl.showAlerts){
					ctrl.getAlerts();
				}
			});
		}
	};

	ctrl.getAlerts = function () {
		ctrl.alerts = [];
		ctrl.titleMaping = {
			urgentActionsCount : {
				color : "red-box",
				title : "Critical/Time Sensitive"
			},
			upcommingActionsCount : {
				color : "yellow-box",
				title : "Coming Up in < 5 days"
			},
			recentActivityCount : {
				color : "green-box",
				title : "Coming Up in < 50 days"
			},
			employeeInformationCount : {
				color : "blue-box",
				title : "Info Only"
			}
		};

		DS.find('bi-alerts', '').then(function (results) {
			for (var prop in results.data) {
				if(results.data[prop] && results.data[prop] > 0){
					ctrl.alerts.push({
						count : results.data[prop],
						color : ctrl.titleMaping[prop].color,
						title : ctrl.titleMaping[prop].title
					});
				}
			}
		}).catch(function(error) {
			ctrl.alerts = [];
		});
	};

	function widgetLoad(){
		ctrl.showPayroll = gso.getUtilService().checkIfWidgetExists("Dashboard", "Next Pay Day");
		ctrl.showTimeOff = gso.getUtilService().checkIfWidgetExists("Dashboard", "Time Off");
		ctrl.showHoliday = gso.getUtilService().checkIfWidgetExists("Dashboard", "Holiday");
		ctrl.showWorkInbox = gso.getUtilService().checkIfWidgetExists("Dashboard", "Work Inbox");
		ctrl.showAlerts = gso.getUtilService().checkIfWidgetExists("Dashboard", "Alerts");
		ctrl.showTrinetReportCard = gso.getUtilService().checkIfWidgetExists("Dashboard", "TriNet Reports");
	}

}
