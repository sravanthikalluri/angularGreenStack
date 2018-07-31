'use strict';

require('./settings.component.scss');

module.exports = {
	template: require('./settings.component.html'),
	controller: ['sharedProperties', 'gso', '$timeout', 'DS', 'SharedDataService', SettingsController]
};

function SettingsController(sharedProperties, gso, $timeout, DS, SharedDataService) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.rolesSpinner = true;
		ctrl.componentsPermissions = SharedDataService.getAppSharedData().componentsPermissions;
        if(!ctrl.componentsPermissions){
            DS.find('permissions', '').then(function (response) {
                ctrl.componentsPermissions = response;
                ctrl.setPermissions(angular.copy(ctrl.componentsPermissions));
            }).catch(function(error) {
			});
		}
		ctrl.setPermissions(angular.copy(ctrl.componentsPermissions));
    }
    ctrl.setPermissions = function(componentsPermissions){
        if(componentsPermissions && componentsPermissions[2]){
        	ctrl.selectedMenuComponentPermissions = gso.getUtilService().splitSubComponentsPermissions(componentsPermissions[2]);
        	gso.getUtilService().toggleComponentPermissions(ctrl.selectedMenuComponentPermissions);
        }
    }

}
