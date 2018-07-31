'use strict';

require('./find-employee-modal.component.scss');

module.exports = {
	templateUrl: 'app/main/company/org-chart/find-employee-modal/find-employee-modal.component.html',
	bindings: {
		modalInstance: '<',
		resolve: '<'
	},
	controller: ['DS', '$filter', '$scope','$timeout', FindEmployeeController]
};

function FindEmployeeController(DS, $filter, $scope, $timeout) {
	var ctrl = this;
	ctrl.selected = 'person';
	ctrl.showSpinner = true;
	ctrl.closebuttonPressed = false;
	ctrl.searchText = '';
	ctrl.$onInit = function() {
		ctrl.showSpinner = false;
		ctrl.errorData = false;
		//ctrl.compileSearchData();
	};
	ctrl.onCancel = function() {
		ctrl.closebuttonPressed = true;
		ctrl.modalInstance.dismiss();
	};

	ctrl.onSearchClicked = function() {
		if(ctrl.selected === 'department'){
			ctrl.departmentService();
		}else{
			ctrl.compileSearchData();
		}

	};

    ctrl.clear = function(){
    	ctrl.searchText = '';
		ctrl.selected = 'person';
		ctrl.onError = null;
    };
	$scope.onNameClick = function(id) {
		ctrl.showSpinner = true;
		ctrl.resolve.data.pageData(id, ctrl.modalInstance);
	};

	ctrl.onClick=function(id){
		ctrl.showSpinner = true;
	    ctrl.resolve.data.departmentData(id, ctrl.modalInstance);
	};
	ctrl.clearSearch = function(){
		if(ctrl.searchText !== ''){
			ctrl.onSearchClicked();
		  }
		  else{
			ctrl.clearAll();
		  }
	};
	ctrl.clearAll = function()
	{
		ctrl.onError = null;
		ctrl.displayData=null;
		ctrl.deptHeading =null;
		ctrl.deptData=null;
	}
	ctrl.clearText = function(item){
		if(item === ctrl.selected){
			ctrl.searchText = '';
		}
	};
	ctrl.shiftDeptEmployee=function(txt)
	{
		ctrl.selected=txt;
		ctrl.searchText='';
		ctrl.clearAll();
	}
	ctrl.filterDepartment = function(){
		var result = [];
		angular.forEach(ctrl.deptData, function (item) {
			if (item.name.toLowerCase().indexOf(ctrl.searchText.toLowerCase()) !== -1) {
				result.push(item);
			}
		});
		return result;
	};


	ctrl.departmentService = function(val){
		//ctrl.clearText(val);
		ctrl.showSpinner = true;
		var searchText=encodeURIComponent(ctrl.searchText);
		DS.find('org-chart-find-department','?status=active&limit=500&offset=1').then(function (results) {
			ctrl.deptData =	results.table_data.facets.departments;
			if(ctrl.searchText){
				ctrl.deptData = ctrl.filterDepartment();
			}
			ctrl.deptHeading = results.column_names;
			ctrl.showSpinner = false;
			ctrl.errorMessage = false;
		}).catch(function (error) {
			ctrl.showSpinner = false;
			ctrl.errorMessage = error.data._error.message;
		});
	};


	ctrl.compileSearchData = function(val) {
		//ctrl.clearText(val);
		ctrl.showSpinner = true;
		var searchText=encodeURIComponent(ctrl.searchText);
		DS.find('org-chart-find-employees', '?status=active&limit=1000&offset=1&&searchTerm='+searchText).then(function (results) {
			ctrl.titles = results.column_names;
			ctrl.employees = results.table_data.employees;
			ctrl.displayData = getSearchDisplayData(ctrl.employees);
			ctrl.showSpinner = false;
			ctrl.errorData = false;
		}).catch(function (err) {
			ctrl.showSpinner = false;
			ctrl.errorData = true;
			ctrl.displayData = err.data._error.message;
		})
	};

	function getSearchDisplayData(employees) {
		var displayData = [];
		var id = 0;
		var expression = ctrl.selected === 'person' ? {name: ctrl.searchText} : {deptDesc: ctrl.searchText};

		angular.forEach(employees, function(key) {
			var fullName = key.fullName.split(',')[0]+' '+ key.fullName.split(',')[1];
			var monogram = key.firstName+' '+ key.lastName;
			var functionString = '$parent.$parent.$parent.$parent.onNameClick(\'' + key.employeeId + '\')';
			var idName = "orgChartPerson_" + id++;
			displayData.push({
				name: '<tn-employee-image aria-hidden="true" employee-name="' + monogram + '"></tn-employee-image>' +
				      '<a href="" id="'+ idName + '" ng-click="'+ functionString +'" aria-label="employee name \'' + fullName + '\'" class="find-employee-modal-employee-link">' + fullName + '</a>',
				email: key.workEmail,
				phone: key.workPhone
			})
		});

		return displayData;
	}
}
