'use strict';

require('./tn-error-banner.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-error-banner/tn-error-banner.component.html',
	controller: TnEditProfileAddressController,
	bindings: {
		errorData: '<'
	}
};
/** @ngInject */
function TnEditProfileAddressController() {
    var ctrl = this;

    // TODO: To close the banner alert.
     ctrl.closeAlert = function() {
          ctrl.errorData=null;
     };
     if(ctrl.errorData){
     	setTimeout(function () {
			angular.element('#alertMessage button').focus();
		},1000)
	 }
}
