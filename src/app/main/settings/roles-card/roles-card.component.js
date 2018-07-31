'use strict';

require('./roles-card.component.scss');

module.exports = {
	template: require('./roles-card.component.html'),
	controller: ['roleService','DS','gso',RolesCardController]
};
/* @ngInject */
function RolesCardController(roleService,DS,gso) {
	var ctrl = this;
	ctrl.checkedMe = true;
	ctrl.employId = 'Y';
	ctrl.rolesData = {};
	var roleArrayData = {};
	ctrl.noRoll = false;
	ctrl.showAssign = ctrl.noRolesAssigned = ctrl.IsVisible = ctrl.IsVisible1 = false;

    ctrl.$onInit = function() {
    	ctrl.showSpinner = true;
     // TODO: Fetch the department data from the company .
       roleService.fetchDepartmentData().then(function(results) {
        ctrl.departments = {};
		var deptOBJ = {
			"deptCode": "All",
			"deptId": "All",
			"deptName": "All Departments",
			"shortDesc": "short"
		};
		ctrl.departments = results;
		ctrl.departments.push(deptOBJ);
		}).catch(function(err){
			ctrl.errorMessage = err.data._statusText;
		});

	  // TODO: Fetch the department data from the company .
	   roleService.fetchLocationData().then(function(results) {
	    ctrl.locations = {};
		var LocOBJ = {
			"deptCode": "All",
			"deptId": "All",
			"deptName": "All Departments",
			"shortDesc": "short"
		};
		 ctrl.locations = results;
		 ctrl.locations.push(LocOBJ);
		 })

     /* roleService.fetchAllRolesData().then(function(results) {
        ctrl.allRolesData = results;
		console.log(ctrl.allRolesData);
       }).catch(function(err){
      });*/

      // TODO: Fetch the employee data from the company .
      roleService.fetchEmployeeRolesData().then(function(results) {
        ctrl.empRolesData = results.data;
        ctrl.empRolesData.map(function (obj,index) {
			   obj.isChecked = true;
			   obj.Id =  obj.roleDesc.replace(/ /g, "");
               return obj;

		});
        ctrl.IsVisible = false;
        ctrl.IsVisible1 = true;
        /*if (results!== undefined) {
		   ctrl.rolesData = roleService.addCheckedRolesFromCheckedList(ctrl.empRolesData, ctrl.allRolesData);
	    } else {
		   angular.forEach(ctrl.empRolesData, function (checkedItem) {
			   checkedItem.isChecked = true;
		   });
		   ctrl.rolesData = ctrl.empRolesData;
	    }*/
	    ctrl.showSpinner = false;
      }).catch(function(err){
         ctrl.showSpinner = false;
         ctrl.noRolesAssigned=true;
      });

      roleService.fetchPayGroupsData().then(function (res) {
		  ctrl.payGroups = res;
	  })

   }

    // TODO: close the error data.
    ctrl.closeAlert = function () {
	 ctrl.data = null;
     };

    ctrl.ShowHide = function () {
		 ctrl.IsVisible = !ctrl.IsVisible;
         ctrl.IsVisible1 = !ctrl.IsVisible1;
	};

	ctrl.showAssignRoles = function () {
		ctrl.showAssign = !ctrl.showAssign;
		ctrl.noRolesAssigned = !ctrl.noRolesAssigned;
	};

    ctrl.filterDept = function (deptId) {
		angular.forEach(ctrl.departments, function (item) {
			if (item.deptId === deptId) {
				deptId = item.deptName;
			}
		});
		return deptId
	};

     ctrl.filterLocation = function (location) {
	   angular.forEach(ctrl.locations, function (item) {
		   if (item.locationId === location) {
			   location = item.locationName;
		   }
	   });
	   return location
   };

	ctrl.filterPayGroup = function(pGroup){
		angular.forEach(ctrl.payGroups, function (item) {
			if (item.payGroupId === pGroup) {
				pGroup = item.payGroupDescription;
			}
		});
		return pGroup
	};

     // TODO: save the roles data.
	 ctrl.onSave = function () {
		var myarray=[];
		for (var i = 0; i < ctrl.rolesData.length; i++) {
			if (ctrl.rolesData[i].isChecked === true) {
				if (ctrl.rolesData[i].role !== "EPTAG" && ctrl.rolesData[i].role !== "EPHRS" && ctrl.rolesData[i].role !== "EPHNA") {
					roleArrayData = {
						"employeeId": gso.getAppConfig().userId,
						"role": ctrl.rolesData[i].role
					};
					myarray.push(roleArrayData);
				}
				if (ctrl.rolesData[i].deptId !== "***" && ctrl.rolesData[i].deptId !== undefined && ctrl.rolesData[i].deptId !== "") {
					roleArrayData = {
						"employeeId":  gso.getAppConfig().userId,
						"role": ctrl.rolesData[i].role,
						"deptId": ctrl.rolesData[i].deptId,
						"location": null
					};
					myarray.push(roleArrayData);
				}
				if (ctrl.rolesData[i].location !== "***" && ctrl.rolesData[i].deptId !== undefined && ctrl.rolesData[i].location !== "") {
					roleArrayData = {
						"employeeId":  gso.getAppConfig().userId,
						"role": ctrl.rolesData[i].role,
						"deptId": null,
						"location": ctrl.rolesData[i].location
					};
					myarray.push(roleArrayData);
				}
			}
		}
	    var data = {"employeeRoleCreateList":[{
						  "employeeId": gso.getAppConfig().userId,
						  "roles":myarray
				  }]  };
	    DS.update('EmployeeRoles', '', data).then(function (results) {
            ctrl.data=err.data;
         }).catch(function(error) {
          ctrl.data=error.data;
       });
	};
}
