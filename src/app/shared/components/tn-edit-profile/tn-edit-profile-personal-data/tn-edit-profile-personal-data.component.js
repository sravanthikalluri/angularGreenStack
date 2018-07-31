'use strict';

require('./tn-edit-profile-personal-data.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-edit-profile/tn-edit-profile-personal-data/tn-edit-profile-personal-data.component.html',
	controller: ['DS', TnEditProfilePersonalDataController],
	bindings: {
		data: '<'
	}
};

/** @ngInject */
function TnEditProfilePersonalDataController(DS) {
    var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.width = {'width' :'250px' };
	}
}
