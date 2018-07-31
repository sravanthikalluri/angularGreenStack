'use strict';

require('./profile.component.scss');

module.exports = {
	templateUrl: 'app/main/profile/profile.component.html',
	controller: ['DS', '$stateParams', 'gso', 'sharedProperties', 'SharedDataService', ProfileController]
};

/* @ngInject */
function ProfileController(DS, $stateParams, gso, sharedProperties, SharedDataService) {
    var ctrl = this;
	var selectedEmpMenuComponentPermissions = sharedProperties.getComponentEmpMenuPermissions();
	var selectedMenuComponentPermissions = sharedProperties.getComponentSelectedMenuPermissions();
	var componentsPermissions = sharedProperties.getComponentPermissions();

	ctrl.$onInit = function () {
		ctrl.setPermissions = function(){
			SharedDataService.getAppSharedData().permissionId = 2;
			getPermissions(SharedDataService.getAppSharedData().permissionId);
			togglePermissions(sharedProperties.getComponentSelectedMenuPermissions());
		};
		if ($stateParams.response) {
			ctrl.success = $stateParams.response;
		}
		ctrl.setPermissions();
		DS.find('current-location','').then(function(results){
			ctrl.data = results.data.data;
			ctrl.officeAddress = ctrl.getOfficeAddress(ctrl.data);
		});

		// TODO: Ideally we can create an officeAddress computed property on the
		// current-location js-data resource and access it from there so we don't
		// have to add this logic to the controller
		ctrl.getOfficeAddress =function(data){
			if(data.address.city && data.address.state){
				var address = data.address.address1
						  +','+data.address.city
						  +','+data.address.state;
				return address;
			}
			else{
				return null;
			}

		};


		function getPermissions (menuId) {
			SharedDataService.getAppSharedData.permissionId = menuId;
			if (selectedMenuComponentPermissions !== undefined && selectedMenuComponentPermissions !== null) {
				selectedMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions(componentsPermissions[SharedDataService.getAppSharedData().permissionId]);
				sharedProperties.setComponentSelectedMenuPermissions(selectedMenuComponentPermissions);
			}
		}
		function togglePermissions(selectedMenuComponentPermissions){
			gso.getUtilService().toggleComponentPermissions(selectedMenuComponentPermissions);
		}

		ctrl.canEdit = function(name){
			var canEdit = false;
			if (selectedMenuComponentPermissions && selectedMenuComponentPermissions.length > 0) {
				angular.forEach(selectedMenuComponentPermissions, function (selectedMenu) {
					if(name === selectedMenu.name && !selectedMenu.permission.canEdit){
						canEdit = true;
					}
				});
			}
			return canEdit;
		};
	};
}
