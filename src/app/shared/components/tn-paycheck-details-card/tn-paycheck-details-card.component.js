'use strict';

require('./tn-paycheck-details-card.component.scss');

module.exports = {
	templateUrl: 'app/shared/components/tn-paycheck-details-card/tn-paycheck-details-card.component.html',
	controller: ['$scope',TnPaycheckDetailsCardController],
	bindings:{
		title: '<',
		small: '<?',
		paycheckDetails: '<',
		errorMessage: '<',
		btnClick: '&'
	}
};

/* @ngInject */
function TnPaycheckDetailsCardController($scope) {
	var ctrl = this;
	$scope.$watch('$ctrl.paycheckDetails.summary', function() {
		if(ctrl.paycheckDetails && ctrl.paycheckDetails.summary){
			// Donut Graph data
			ctrl.colors = ['#6FBB4C','#3DB7E4','#EEAE40','#2D6997'];
			ctrl.amounts = ctrl.paycheckDetails.summary.map(function(d) { return d.amount; });
			ctrl.showSpinner = false;
		}

	}, true);

	ctrl.btnClick = function(){
		ctrl.showModal = true;
	}

	ctrl.$onInit = function() {
		ctrl.showSpinner = true;
	}

	ctrl.$onChanges = function(){
	}
}
