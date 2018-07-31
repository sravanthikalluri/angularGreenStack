'use strict';

require('./onboarding-card.component.scss');

module.exports = {
	templateUrl: 'app/main/dashboard/onboarding-card/onboarding-card.component.html',
	controller: ['DS', 'gso', 'roleService', '$q', '$rootScope', '$timeout', '$translate','$window', OnboardingCardController]
}

/* @ngInject */
function OnboardingCardController(DS, gso, roleService, $q, $rootScope, $timeout, $translate, $window) {
	var ctrl = this;
	ctrl.showOnboardingCard = false;
	ctrl.data = {};
	ctrl.dueDate = null;
	ctrl.displayNum = 10;

	ctrl.completeTasks = function(){
		DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: ctrl.completeTaskData['onboardTask'], date:ctrl.completeTaskData['completionDate'].concat("1")}})
		.then(
			function(response){
				ctrl.showCompleteCard = false;
				ctrl.showOnboardingCard = false;
			}
		);
	}

	// Function converts a date to the due date if completion date is not null and there is a due date to calculate
	ctrl.getDueDate = function(dueDate, completionDate){
		// Getting due date
		try{
			if (ctrl.dueDate === null && dueDate !== null && (ctrl.isCanadian === true || completionDate === null)) {
				var date = new Date(dueDate.replace(/-/g, "/")).getTime() - new Date().getTime();
				ctrl.dueDate = Math.ceil(date / (1000 * 60 * 60 * 24));
			}
		}
		catch (error) { console.error(error); }
	}

	// Function gets the lowest number based on the display number and completion date is not null
	ctrl.getNewLowestDisplayNum = function(completionDate, displayNum){
		// Getting lowest displayNum
		try{
			if (completionDate === null && ctrl.displayNum > displayNum){
				ctrl.displayNum = displayNum;
			}
		}
		catch(error){console.error(error);}

	}

	ctrl.goToAppStore = function(url){
		$window.open(url, "_blank");
	}

	// Function updates the i-9 status and moves to the next task
	ctrl.onI9Clicked = function(value){
		if (value === "I9 Pending"){
			ctrl.data["I_9"]["completionDate"] = "Pending";
			ctrl.displayNum = 10;
			ctrl.dueDate = null;
			for (var key in ctrl.data){
				ctrl.getNewLowestDisplayNum(ctrl.data[key]['completionDate'], ctrl.data[key]['displayOrder']);
				ctrl.getDueDate(ctrl.data[key]['dueDate'], ctrl.data[key]['completionDate']);
			}
		}
	}

	// Function listens to event and updates the due date and gets the new lowest display num when called
	$rootScope.$on("onboardingComponent", function (evt, data) {
		if (data.value) {
			if (data.value == "error") {
				$translate(['call-help-desk']).then(function (translatedText) {
					ctrl.errorAlert = {
						_statusCode: 'Error',
						_statusMessage: translatedText['call-help-desk']
					}
					console.log(ctrl.errorAlert);
				});
			}
			ctrl.displayNum = 10;
			ctrl.dueDate = null;
			for (var key in ctrl.data){
				ctrl.getNewLowestDisplayNum(ctrl.data[key]['completionDate'], ctrl.data[key]['displayOrder']);
				ctrl.getDueDate(ctrl.data[key]['dueDate'], ctrl.data[key]['completionDate']);
			}
		}
	});

	// Function listens to event and updates the due date and gets the new lowest display num when called
	$rootScope.$on("onboardingSkipEvent", function (evt, data) {
		if (data.value == "skipped") {
			ctrl.displayNum++;
		}
	});
	ctrl.$onInit = function () {
		ctrl.showSpinner = true;
		$translate(['trinet-mobile-app-google-link', 'trinet-mobile-app-apple-link']).then(function(translatedText){
			ctrl.googleStoreAddress = translatedText['trinet-mobile-app-google-link'];
			ctrl.appleStoreAddress = translatedText['trinet-mobile-app-apple-link'];
		})
		ctrl.showCompleteCard = null;
		// Getting onboarding tasks and i9 status
		$q.all([DS.find('onboarding-get-tasks', ''), DS.find('onboarding-i9-status', ''),
				gso.getAppConfig().countryCode, gso.getAppConfig().designation]).then(function (result) {
			ctrl.completeTaskData = null;
			// Checking for Canada
			ctrl.isCanadian = result[2] === 'CA' || result[2] === 'CAN'? true : false;
			ctrl.isTA = result[3] === "Trusted Advisor" ? true : false;
			if(gso.getAppConfig().statecode === 'CA' || gso.getAppConfig().statecode === 'NY'){
				ctrl.isK1 = result[0]['data'].length === 5 ? true: false;
			}
			else{
				ctrl.isK1 = result[0]['data'].length === 4 ? true: false;
			}
			for (var i = 0; i < result[0]['data'].length; i++) {
				try {
					var tempData = result[0]['data'][i];
					ctrl.data[tempData['onboardTask']] = tempData;
					// Deciding to show onboarding task card or not
					if (tempData['completionDate'] == null){
						ctrl.showOnboardingCard = true;
					}
					else if(tempData['onboardTask'] == "PERSONAL_INFORMATION"){
						ctrl.completeTaskData = tempData;
					}
					if (tempData['onboardTask'] !== "I_9"){
						ctrl.getNewLowestDisplayNum(tempData['completionDate'], tempData['displayOrder']);
					}
					// Getting due date
					ctrl.getDueDate(tempData['dueDate'], tempData['completionDate']);
				}
				catch (error) {
					console.error(error);
				}
			}
			try {
				// Getting i9 status, and if completed update the i9 data
				if (ctrl.data['I_9']){
					// I9 task is required
					if (!result[1]['data'][0] || result[1]['data'][0]['processStep'] === 0){
						// I9 not completed
						ctrl.displayNum = 1;
						ctrl.data['I_9']['completionDate'] = null;
						ctrl.showOnboardingCard = true;
					}
					else if (result[1]['data'][0]['processStep'] === 1){
						// I9 Completed
						ctrl.data['I_9']['completionDate'] = "Pending";
						DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: ctrl.data["I_9"]['onboardTask'], date: ""}});
					}
					else if (result[1]['data'][0]['processStep'] === 2){
						// I9 Completed
						ctrl.data['I_9']['completionDate'] = "Complete";
						DS.update('onboarding-post-task', '', '', { extraUrlParams: { taskId: ctrl.data["I_9"]['onboardTask'], date: ""}});
					}
				}
			}
			catch (error) {
				console.error(error);
			}

			// Showing complete card when all tasks are completed
			if (!ctrl.showOnboardingCard){
				var completionDate = new Date (ctrl.completeTaskData['completionDate']);
				var lastUpdateDate = new Date (ctrl.completeTaskData['lastUpdated']);
				if (lastUpdateDate.getTime() - completionDate.getTime() < 1000){
					ctrl.showCompleteCard = true;
				}
			}
			// Not showing the card if due date has passed
			if (ctrl.dueDate < 0){
				ctrl.showOnboardingCard = false;
				ctrl.completeTaskData = false;
			}
		}, function (error) {
			console.error(error);
		});
	};

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 2000);
}
