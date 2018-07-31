'use strict';

require('./public-profile.component.scss');

module.exports = {
	template: require('./public-profile.component.html'),
	controller: ['$stateParams','DS','stringUtil', '$state', PublicProfileController]
};

/* @ngInject */
function PublicProfileController($stateParams, DS, stringUtil, $state) {
	var ctrl = this;
	var emp;
	DS.find('employeeService', $stateParams.id+'/emp-details').then(function (results) {
		ctrl.modalData = results.employeeDetails;
		ctrl.officeAddress = ctrl.getOfficeAddress(ctrl.modalData);
		try {
			if(ctrl.modalData.employeeDetails.preferredName){
				emp = ctrl.modalData.employeeDetails.preferredName.split(" ");
				ctrl.modalData.initials = emp[0].charAt(0)+emp[1].charAt(0);
			}else{
				emp = ctrl.modalData.employeeName.split(" ");
				ctrl.modalData.initials = emp[0].charAt(0)+emp[1].charAt(0);
			}
		} catch(e) {
			// console.log("Error: ", e);
			return;
		}
	});

	ctrl.getOfficeAddress =function(data){
		try {
			if(data.employeeDetails.address.city && data.employeeDetails.address.state) {
				var address = data.employeeDetails.address.address1
							+','+data.employeeDetails.address.city
							+','+data.employeeDetails.address.state;
							+','+data.employeeDetails.address.postalCode;
				return address;
			}
			else{
				return null;
			}
		} catch(e) {
			// console.log("Error: ", e);
			return;
		}
	};

	ctrl.getFullAddressHtml = function(data) {
		var arr;

		if (!data) {
			return;
		}

		arr = [
			stringUtil.join([data.address1]),
			data.address2,
			stringUtil.join([data.city, data.state, data.postalCode])
		];
		return stringUtil.join(arr, '<br>');
	};

	ctrl.openManagerProfile = function() {
		$state.transitionTo('app.main.public-profile', {id: ctrl.modalData.managerId});
	}
}
