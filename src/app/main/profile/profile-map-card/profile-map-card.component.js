'use strict';

require('./profile-map-card.component.scss');

module.exports = {
	template: require('./profile-map-card.component.html'),
	controller: ['stringUtil', '$timeout',ProfileMapCardController],
	bindings: {
		data: '<',
		officeAddress: '<'
	}
};

/* @ngInject */
function ProfileMapCardController(stringUtil, $timeout) {
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
	}
	$timeout(function () {
 		ctrl.showSpinner = false;
 	}, 2000);

	// TODO: Move this logic into current-location.service.js
	ctrl.getFullAddressHtml = function(data) {
		var arr;

		if (!data) {
			return;
		}

		arr = [
			stringUtil.join([data.address.address1]),
			data.address.address2,
			stringUtil.join([data.address.city, data.address.state, data.address.postalCode])
		];
		return stringUtil.join(arr, '<br>');
	};
}
