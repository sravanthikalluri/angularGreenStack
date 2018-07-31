'use strict';

require('./company-locations.component.scss');

module.exports = {
	templateUrl: 'app/main/company/overview/company-locations/company-locations.component.html',
	controller: ['DS','US_STATES','CA_PROVINCES', 'SharedDataService', CompanyLocationsController]
};

/* @ngInject */
function CompanyLocationsController (DS,US_STATES,CA_PROVINCES, SharedDataService) {
	var ctrl = this;

	ctrl.$onInit = function () {
		ctrl.locationsFinished = true;
		ctrl.otherLocations = [];
		ctrl.states = [];
		ctrl.locations =[];

		DS.find('locations','').then(function(results){
			ctrl.data = results.data;
			ctrl.locationsFinished = false;
			ctrl.getHeadQuarter(ctrl.data);
			ctrl.otherLocations = ctrl.getOtherLocations(ctrl.data);
			if(SharedDataService.getAppSharedData().countryCode === 'CA'){
				ctrl.states = ctrl.getFullStateName(ctrl.otherLocations,CA_PROVINCES);
			}
			else{
				ctrl.states = ctrl.getFullStateName(ctrl.otherLocations,US_STATES);
			}
			ctrl.locations = ctrl.groupByStates(ctrl.states);
			if(ctrl.headquarter !== undefined){
				ctrl.headquarteraddress = ctrl.headquarter.address.address1
										  +','+ctrl.headquarter.address.city
										  +','+ctrl.headquarter.address.state;
			}
		}).catch(function(error) {
			ctrl.errorMessage = error.data._statusText;
		});


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

		ctrl.getOtherLocations = function(data){
			var results = [];
			data.filter(function(data){
				if(data.headquarter === 'false'){
					results.push(data);
				}
			});
			return results;
		};

		ctrl.getFullStateName =function(locations,states){
			var returnValue =[];
			states.filter(function(data){
				locations.filter(function(results){
					if(results.address.state === data.key){
						results.fullStateName = data.value;
						returnValue.push(results);
					}
				});
			});
			return returnValue;
		};

		ctrl.groupByStates =function(data){
			var groups = {};

			data.map(function(data){
				var item = data;
				if(!groups[item.fullStateName] && !item.isRemote) {
					groups[item.fullStateName] = [];
				}

				if(item.address.address1 !== null){
					item.address.address1 = item.address.address1.trim();
				}

				if(item.address.city !== null){
					item.address.city = item.address.city.trim();
				}

				if(item.officeHours !== null){
					item.officeHours = item.officeHours.trim();
				}
				if(!item.isRemote){
					groups[item.fullStateName].push({
						address: item.address,
						phone: item.phone,
						officeHours: item.officeHours,
						shortDesc: item.shortDesc,
						locationName: item.locationName
					});
				}
			});

			var result = [];

			for(var x in groups) {
				if(Object.prototype.hasOwnProperty.call(groups, x)) {
					var obj = {};
					obj[x] = groups[x];
					obj.fullStateName = x;
					result.push(obj);
				}
			}
			return result;
		};
	}
}
