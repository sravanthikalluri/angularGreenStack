'use strict';

require('./casemanagement-card.component.scss');
require('../contact.component.scss');

module.exports = {
	template: require('./casemanagement-card.component.html'),
	controller: ['gso' , 'DS',CaseManagementCardController]
};

/* @ngInject */

function CaseManagementCardController(gso,DS){
	var ctrl = this;
	var pfClient = gso.getAppConfig().pfClient;
    var peoId = gso.getAppConfig().peoId;
	ctrl.hideComponent = true;
	ctrl.companyStatistics;

	DS.find('permissions', '').then(
		function (response) {
			if (response !== undefined && response !== null) {
				if(response["95"][0].id === 49 && response["95"][0].permission.canView === true){
					ctrl.caseManagement = true;
					response["95"][0].subComponents.map(function(data){
						if(data){
							if(data.id === 50 && data.permission.canView === true){ // Add a Case
								ctrl.addCase = true;
							}
							if(data.id === 51 && data.permission.canView === true){// Manage my Cases
								ctrl.managecases = true;
							}
							if(data.id === 52 && data.permission.canView === true){//View my case statistics
								ctrl.mystats = true;
							}
							if(data.id === 53 && data.permission.canView === true){//View Company Case Statistics
								ctrl.companystats = true;
							}
						}
					});
				}
			}
		}).catch(function(error) {
			console.log('error is'+error);
	});
	ctrl.getUrl = function(val){
        ctrl.ssoURL = "/#/ssowidget/"+val;
    }
}
