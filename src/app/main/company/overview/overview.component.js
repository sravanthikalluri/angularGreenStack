'use strict';

require('./overview.component.scss');

module.exports = {
	templateUrl: 'app/main/company/overview/overview.component.html',
	controller: ['DS','gso','SharedDataService',OverviewController]
};

/* @ngInject */
function OverviewController (DS,gso, SharedDataService) {
	var ctrl = this;

	ctrl.$onInit = function () {
		var companyId = gso.getAppConfig().companyId;
		ctrl.locationsFinished = true;
		ctrl.employeesFinished = true;
		ctrl.offset=0;
		ctrl.status = gso.getAppConfig().empStatus === 'T';
		var menuData = JSON.parse(SharedDataService.getAppSharedData().navigationSide);
		menuData.map(function(menu){
			if(menu.menus && menu.text === "Company"){
				ctrl.disableEmployee = menu.menus.filter(function(item){
					return item.text === "Company Directory";
				}).length === 0;
			}
		});
		DS.find('locations','').then(function(results){
			ctrl.locations = results.data;
			ctrl.locationsFinished = false;
			ctrl.numberOfLocations = 0;
			angular.forEach(ctrl.locations, function(value, key) {
			  	if(!value.isRemote){
					ctrl.numberOfLocations++;
				}
			});
		}).catch(function(error) {
			ctrl.locationsError = error.data._statusText;
		});
	    DS.find('company_directory', '../api-employee/v2/company/' + companyId + '/directory?employmentStatus=active&limit=20&offset='+ctrl.offset)
		  .then(function (results) {
				if (results.data.pagination) {
					ctrl.totalCount = results.data.pagination.total;
				}
				else if (results.data.count) {
					ctrl.totalCount = results.data.count;
				}
			ctrl.employeesFinished = false;
     	}).catch(function(error) {
			ctrl.errorMessage = error.data._statusText;
		});
		ctrl.companyName = gso.getAppConfig().companyName;

		DS.find('headquarters-address','').then(function(results){
			ctrl.headquarter = results.data;
			if(ctrl.headquarter !== undefined) {
				ctrl.headquarteraddress = ctrl.headquarter.address1 + ','
					+ ctrl.headquarter.city + ','
					+ ctrl.headquarter.state;
			}

		}).catch(function(error) {
			ctrl.locationsError = error.data._statusText;
		});

	}

	ctrl.getHeadQuarter = function(data){
		data.filter(function(data){
			if(data.headquarter === 'true'){
				if(data.officeHours !==null){
					data.officeHours = data.officeHours.trim();
				}
				ctrl.headquarter = data;
			}
		});
	};
}
