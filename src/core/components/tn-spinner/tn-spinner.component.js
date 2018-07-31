'use strict';

require('./tn-spinner.component.scss');

module.exports={
    template: require('./tn-spinner.component.html'),
    controller: ['$timeout',tnSpinnerController],
    bindings: {
		timeoutDuration: '<',
		errorMessage:'<',
		isShow:'<'
	}
};

function tnSpinnerController($timeout){
    var ctrl=this;


    ctrl.$onInit = function(){
    	ctrl.showSpinner = true;

    }

    ctrl.$onChanges = function(){
    	ctrl.showSpinner = true;
	}

  //ToDo: Hidding the spinner and show the appropriate error message
	if(ctrl.isShow){
		var timeoutDuration = 2000;

		if (ctrl.timeoutDuration){
			timeoutDuration = ctrl.timeoutDuration;
		}

		$timeout(function () {
			ctrl.showSpinner = false;
		}, timeoutDuration);
	}

};
