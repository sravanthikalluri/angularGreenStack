'use strict';

require('./org-chart.component.scss');

module.exports = {
	templateUrl: 'app/main/company/org-chart/org-chart.component.html',
	controller: ['DS', 'OrgChartDataService','$window','$state','$uibModal','$timeout',OrgChartController]
};
/* @ngInject */
function OrgChartController(DS, OrgChartDataService,$window,$state,$uibModal,$timeout) {
	var ctrl = this;
	ctrl.employee= {};
	var svc = OrgChartDataService;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
		ctrl.hideOrgChart = true;
	    var empID = $window.sessionStorage.getItem('empId');
	    ctrl.getPageData(empID);
/*		svc.fetchOrgChartByEmployeeID(empID).then(function(chartResults) {
			ctrl.data = chartResults;
			ctrl.data.managers = chartResults.data.managers;
			setCurrentUserDetails(chartResults.data.colleagues,empID);
			ctrl.manager = chartResults.data.managers;
			getDirectReports(chartResults.data.members);
			ctrl.showSpinner = false;
		}).catch(function (error) {
			ctrl.errorMessage = error.data._statusText;
		});*/
	}

	ctrl.getPageData = function(employeeId, modalInstance) {
			var manageOrder = [];
			svc.fetchOrgChartByEmployeeID(employeeId).then(function(chartResults) {
			var uniqueNames = [];
			var uniqueObj = [];
			 for (var i = 0; i < chartResults.data.managers.length; i++) {
			  if (uniqueNames.indexOf(chartResults.data.managers[i].employeeId) === -1) {
					uniqueObj.push(chartResults.data.managers[i]);
					uniqueNames.push(chartResults.data.managers[i].employeeId);
				}
			}
			if (uniqueObj.length > 1) {
				angular.forEach(uniqueObj, function (manager, index) {
					if (manager.relation !== 'prox') {
						if (manager.relation === 'supr') {
							manageOrder[0] = manager;
						} else {
							manageOrder[1] = manager;
						}
					}
				});
				chartResults.data.managers = manageOrder;
			} else {
				chartResults.data.managers = uniqueObj;
			}
			setCurrentUserDetails(chartResults.data.colleagues, employeeId);
			ctrl.manager=chartResults.data.managers;
			getDirectReports(chartResults.data.members);
		});
		modalInstance && modalInstance.close();
		$timeout(function () {
			angular.element(document.querySelector('div#direct-manager-name')).focus();
		}, 1000);
		
	}

	ctrl.getDepartmentData = function(id, modalInstance) {
		  ctrl.showSpinner = true;
		  DS.find('org-chart', 'org-chart?deptId='+id).then(function (chartResults) {
				ctrl.data = chartResults.data.departmentHeads;
				//ctrl.data.managers = chartResults.departmentHeads.managers;
				setCurrentUserDetails(chartResults.data.departmentHeads,chartResults.data.departmentHeads[0].employeeId);
				ctrl.manager = chartResults.data.managers;
				getDirectReports(chartResults.data.members);
				ctrl.showSpinner = false;
			  	modalInstance && modalInstance.close();
			}).catch(function(error) {
				ctrl.hideOrgChart = false;
			    ctrl.showSpinner = false;
			  	modalInstance && modalInstance.close();
				ctrl.errorMessage = error.data._error.message;
		  });
    };
	ctrl.openModal = function() {
		var modal = $uibModal.open({
			template  : '<find-employee-modal></find-employee-modal>',
			component : 'findEmployeeModal',
			resolve   : {
				data: function () { return {
					pageData: ctrl.getPageData,
					departmentData: ctrl.getDepartmentData
				}}
			}
		});

		return modal.result;
	};
	ctrl.profileView = function(employeeId){
		var empID = $window.sessionStorage.getItem('empId');
		if(employeeId === empID){
			$state.go('app.main.profile');
		}
	};

	function getDirectReports(members) {
		ctrl.reportsFinished = false;
		ctrl.directReports = members;
		/*angular.forEach(members, function(key, index) {
			svc.fetchOrgChartByEmployeeID(key.employeeId).then(function(chartResults) {
				ctrl.directReports[index].teamMemberCount = chartResults.data.members.length;
			})
		});*/
		ctrl.reportsFinished = true;
	}

	function setCurrentUserDetails(employees, id) {
		angular.forEach(employees,function(key, index) {
			if(key.employeeId === id) {
				ctrl.employee = employees[index];
			}
		});
	}

	/*function compileSearchData() {
		DS.find('org-chart-find-employees', 'employees?employmentStatus=active&limit=20&offset=0').then(function (results) {
			ctrl.searchTableTitles = results.column_names;
			ctrl.employees = results.table_data.empLst;
			ctrl.employeeSearchDisplayData = getSearchDisplayData(ctrl.employees);
		});
	}

	function getSearchDisplayData(employees) {
		var displayData = [];

		angular.forEach(employees, function(key) {
			displayData.push({
				name: '<a>' + key.firstName + ' ' + key.lastName + '</a>',
				email: key.work_email,
				phone: key.homePhone
			})
		})

		return displayData;
	}*/
}
