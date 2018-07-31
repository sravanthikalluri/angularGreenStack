'use strict';

require('./tn-edit-profile-address.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-edit-profile/tn-edit-profile-address/tn-edit-profile-address.component.html',
	controller: ['DS','$state',TnEditProfileAddressController],
	bindings: {
		data: '<'
	}
};

/** @ngInject */
function TnEditProfileAddressController(DS,$state) {
    var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.width = {'width' :'250px' };
		DS.find('combo-box','').then(function(results){
			ctrl.comboBoxData = results;
		});
	}
}
