'use strict';

require('./tn-flyout-error.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-flyout-error/tn-flyout-error.component.html',
	controller: errorFlyoutController,
	bindings: {
		 msg: '@',
		 focus : '='
	}

};
	function errorFlyoutController() {
        var ctrl = this;
ctrl.$onInit=function(){

}
    }
