'use strict';

require('./company-directory-table.component.scss');

module.exports = {
	templateUrl: 'app/main/company/company-directory/company-directory-table/company-directory-table.component.html',
	controller: ['DS','$state', 'gso', CompanyDirectoryTableController]
};

/* @ngInject */
function CompanyDirectoryTableController(DS, $state, gso) {
	var ctrl = this;
	var companyId = gso.getAppConfig().companyId;
	var employmentStatus = 'active';
	ctrl.deptIdFilterList = [];
	ctrl.deptIdFilterListStr = '';
	ctrl.locationIdFilterList = [];
	ctrl.locationIdFilterListStr = '';
	var nameFilter = '';
	var sortFilter = '';
	var urlQueryParams = 'status=active&limit=50&offset=1';
	var defaultURL = '/api-employee/v2/company/' + companyId + '/directory?';
	var nextURL = defaultURL + urlQueryParams;
	var resetFilters = false;
	var initialLoad = true;

	ctrl.filter = true;
	ctrl.terminateOffSet = 0;
	ctrl.employeeData = [];
	ctrl.totalCount = null;
	ctrl.depFilter = false;
	ctrl.locFilter = false;
	ctrl.showTotal = false;

	ctrl.resetData = function(){
		ctrl.employeeData = [];
		ctrl.showTotal = false;
		urlQueryParams = 'status=active&limit=50';
		urlQueryParams += '&offset=1'
		// if (nameFilter === '') {

		// }
	};

	ctrl.setQueryParams = function(){
		if (ctrl.deptIdFilterListStr !== '') {
			urlQueryParams += '&deptIds=' + ctrl.deptIdFilterListStr;
		}
		if (ctrl.locationIdFilterListStr !== '') {
			urlQueryParams += '&locationIds=' + ctrl.locationIdFilterListStr;
		}
		if (nameFilter !== '') {
			urlQueryParams += '&searchTerm=' + nameFilter;
		}
		if (sortFilter !== '') { // per api we don't add order param if sorting by ASC
			if (sortFilter === 'DESC'){
				urlQueryParams += '&sortOrder=' + sortFilter.toLowerCase();
			}
		}
	};

	ctrl.sortResults = function (sortDirection) {
		sortFilter = sortDirection;
		ctrl.invokeFilters();
	};

	/* Loading the  data on Scroll*/
	ctrl.showMore=function(){
		ctrl.getEmployees();
	}

	ctrl.$onInit = function () {
		ctrl.showSpinner = true;
		ctrl.searchBoxData = { value: '' };
		ctrl.showModal = false;
		ctrl.getEmployees();
	};

	ctrl.closeFilter = function () {
		ctrl.locFilter = false;
		ctrl.depFilter = false;
	};

	ctrl.finsihedLoading = function(){
		ctrl.showSpinner=false;
		//ctrl.showSpinner = !(ctrl.employeeFinishedLoading && ctrl.departmentsFinishedLoading && ctrl.locationsFinishedLoading);
		ctrl.employeesByDeptLoading = false;
		ctrl.employeesByLocLoading = false;
	};

	/* Open the modal with dynamic data */
	ctrl.openModal = function(employeeId) {
		$state.transitionTo('app.main.public-profile', {id: employeeId});
	};

	/* Search Filter */
	ctrl.searchFilter =function() {
		if(ctrl.searchBoxData.value !== undefined && ctrl.searchBoxData.value.length >0){
			nameFilter = ctrl.searchBoxData.value;
		}
		else {
			nameFilter = '';
			nextURL = defaultURL;
		}
		ctrl.invokeFilters();
	}
	ctrl.markDepartmentLocation=function()
	{
		angular.forEach(ctrl.departments,function(dep)
		{
			dep.departmentChecked=false;
		});
		angular.forEach(ctrl.locations,function(dep)
		{
			dep.locationChecked=false;
		})
		angular.forEach(ctrl.deptIdFilterList, function (item) {
			 angular.forEach(ctrl.departments,function(dep)
			{
					if(item==dep.id)
						{
							dep.departmentChecked=true;
						}
			})
		});
		angular.forEach(ctrl.locationIdFilterList, function (item) {
			angular.forEach(ctrl.locations,function(loc)
			{
					if(item==loc.id)
						{
							loc.locationChecked=true;
						}
			})
		});
	}
	ctrl.getEmployees=function(){
		if (resetFilters) {
			nextURL = defaultURL + urlQueryParams;
			resetFilters = false;
		}
		if(nextURL !== ''){
			DS.find('company_directory', '..' + nextURL).then(function (results) {
				ctrl.employeeData = ctrl.employeeData.concat(results.data.employees);
				if(results.data.facets)
					{
						if (initialLoad) {
						ctrl.departments =results.data.facets.departments? angular.copy(results.data.facets.departments):null;
						}
					}
				if(results.data.facets)
					{
						if (initialLoad) {
						ctrl.locations =results.data.facets.locations? angular.copy(results.data.facets.locations):null;
						}
					}
				ctrl.markDepartmentLocation();
				ctrl.locationChecked = false;
				ctrl.departmentChecked = false;
				if (results.data.pagination) {
					ctrl.totalCount = results.data.pagination.total;
				}
				else {
					ctrl.totalCount = ctrl.employeeData.length;
				}

				if (initialLoad) {
					ctrl.unfilteredTotal = ctrl.totalCount;
					initialLoad = false;
				}
				ctrl.showTotal = true;

				ctrl.employeeFinishedLoading = true;
				ctrl.filter = false;
				ctrl.isShowingTerminated = true;

				if (results.data.pageLinks) {
					var nextURLObj = results.data.pageLinks.filter(function (pagelink) {
						return pagelink.rel === 'next';
					});

					if (nextURLObj.length > 0) {
						nextURL = nextURLObj[0].href;
					}
					else {
						nextURL = '';
					}
				}
				else {
					nextURL = '';
				}
				ctrl.finsihedLoading();
			}).catch(function(err) {
				ctrl.employeeFinishedLoadingLoading = true;
				ctrl.finsihedLoading();
			});
		}
	};

	ctrl.invokeFilters = function() {
		resetFilters = true;
		ctrl.resetData(); // reset activeData
		ctrl.setQueryParams();
		ctrl.getEmployees(); // call company directory api
	};

	ctrl.filterLocations = function (loc, checked) {
		resetFilters = true;
		ctrl.employeesByLocLoading = true;
		if(loc==='locCleared'){
			ctrl.locationIdFilterList = [];
			angular.forEach(ctrl.locations, function (item) {
				item.locationChecked=false;
			});
		}
		if (checked) {
			if (ctrl.locationIdFilterList.indexOf(loc.id) < 0) {
				ctrl.locationIdFilterList.push(encodeURIComponent(loc.id));
			}
		} else {
			ctrl.locationIdFilterList.splice(ctrl.locationIdFilterList.indexOf(loc.id), 1);
		}
		ctrl.locationIdFilterListStr = (ctrl.locationIdFilterList.join("&locationIds="));
		ctrl.invokeFilters();
	};

	ctrl.filterDepartments = function (dept, checked) {
		resetFilters = true;
		ctrl.employeesByDeptLoading = true;
		if(dept==='deptCleared'){
			ctrl.deptIdFilterList = [];
			angular.forEach(ctrl.departments, function (item) {
				item.departmentChecked=false;
			});
		}
		if (checked) {
			if (ctrl.deptIdFilterList.indexOf(dept.id) < 0) {
				ctrl.deptIdFilterList.push(encodeURIComponent(dept.id));
			}
		} else {
			ctrl.deptIdFilterList.splice(ctrl.deptIdFilterList.indexOf(dept.id), 1);
		}

		ctrl.deptIdFilterListStr = ctrl.deptIdFilterList.join("&deptIds=");
		ctrl.invokeFilters();
	};

	ctrl.column_names = [
		{ "name": "Employee Name", "class": "employee", "arrowDown": "true" },
		{ "name": "Business Title", "class": "position" },
		// { "name": "Status", "class": "status" },
		{ "name": "Department", "class": "department", "depFilter":"true" },
		{ "name": "Location", "class": "location", "locFilter":"true" },
		// { "name": "Service Date", "class": "service" },
		{ "name": "Direct Manager", "class": "manager" }
	];
}
