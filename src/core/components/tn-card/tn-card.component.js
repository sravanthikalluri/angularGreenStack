'use strict';

require('./tn-card.component.scss');

module.exports = {
	template: require('./tn-card.component.html'),
	transclude: true,
	controller: ['$timeout',tnCardController],
	bindings:{
		loading: '=',
		titles: '@'
	}
};

function tnCardController($timeout){
	var ctrl = this;

	ctrl.$onInit = function(){
		ctrl.showSpinner = true;
	}

	ctrl.$onChanges = function(){
		ctrl.showSpinner = true;
	}

	$timeout(function () {
		ctrl.showSpinner = false;
	}, 1000);

}
