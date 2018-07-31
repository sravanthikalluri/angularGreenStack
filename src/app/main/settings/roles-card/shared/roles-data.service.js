'use strict';

module.exports = RoleInfoService;

/* @ngInject */
function RoleInfoService(DS, $q, $filter) {
    var svc = {};
   	svc.fetchAllRolesData = fetchAllRolesData;
   	svc.fetchEmployeeRolesData=fetchEmployeeRolesData;
   	svc.fetchDepartmentData=fetchDepartmentData;
   	svc.fetchLocationData=fetchLocationData;
   	svc.addCheckedRolesFromCheckedList=addCheckedRolesFromCheckedList;
   	svc.fetchPayGroupsData=fetchPayGroupsData;

   	return svc;

    // TODO: Get all the roles that are available.
   	function fetchAllRolesData() {
    	return DS.find('roles', '');
    }

    // TODO: Get only the role defined for the user.
	function fetchEmployeeRolesData() {
		return DS.find('EmployeeRoles', '')
	}

    // TODO: Get Department from company.
    function fetchDepartmentData() {
    	return DS.find('department', '')
    }

   // TODO: Get Locations from company.
    function fetchLocationData() {
    	return DS.find('companyLocation', '')
    }

    function fetchPayGroupsData() {
		return DS.find('payGroup', '')
	}

    // TODO: Getting the Specific Roles.
    function addCheckedRolesFromCheckedList(checkedroles, roles){
	      angular.forEach(roles, function (item) {
			 item.isChecked = false;
			 item.deptId = '';
			 item.location = '';
			 angular.forEach(checkedroles, function (checkedItem) {
				 if (item.role === checkedItem.role) {
					 item.isChecked = true;
					 item.deptId = checkedItem.deptId;
					 item.location = checkedItem.location;
				 }
			 });
		 });
		return roles;
    }

}
