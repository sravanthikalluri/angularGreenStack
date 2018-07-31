'use strict';

require('./tn-profile.component.scss');

module.exports = {
	template: require('./tn-profile.component.html'),
	controller: ['ProfileDataService', 'gso', TnProfileController]
};

/* @ngInject */
function TnProfileController(ProfileDataService, gso) {
	var ctrl = this;
	ctrl.$onInit = function() {
		ProfileDataService.fetch().then(function(result) {
			ctrl.data = result;
			ctrl.data.enableEditField = true;
			ctrl.data.countryName = gso.getAppConfig().countryCode;
		}).catch(function(err) {
			console.log(err);
		});
	};
}

/** @ngInject */
// function TnProfileController(ProfileDataService, $state, genericService) {
// 	var ctrl = this;

// 	ctrl.$onInit = function() {
// 		ProfileDataService.fetchAllProfileWithDetails().then(function (results) {
// 			ctrl.data = results;

// 			genericService.gender().then(function (data) {
// 				ctrl.data.activePersonalDataList[0].genderDescription = returnfilteredObject(data.genders.data, ctrl.data.activePersonalDataList[0].gender).value;
// 			});

// 			genericService.relationShips().then(function (data) {
// 				ctrl.data.emergencyContacts[0].contactRelationshipDescription = returnfilteredObject(data.relationShips.data, ctrl.data.emergencyContacts[0].contactRelationship).value;
// 			});
// 		});


// 	}

// 	ctrl.edit = function() {
//        $state.go('app.main.editProfile');
//     }

// 	function returnfilteredObject(arr, value) {
// 		var tempObj = null;
// 		angular.forEach(arr, function (obj) {
// 			if (obj.key === value) {
// 				tempObj = obj;
// 				return;
// 			}
// 		});
// 		return tempObj;
// 	}
