'use strict';


module.exports = {
	template: require('./state-specific-forms.component.html'),
	controller: ['$stateParams','$window',stateSpecificController]
};

/* @ngInject */
function stateSpecificController($stateParams,$window) {
	var ctrl = this;
	ctrl.showIndex = false;
	ctrl.label = null;
	ctrl.stateSpecific = $stateParams.data;
	ctrl.$onInit = function() {
		angular.element("#specific-form").focus();
	}
	ctrl.tootleLink = function(index,data){
		ctrl.showIndex =! ctrl.showIndex;
		if(ctrl.label == null){
			ctrl.label = data.label;
		}else if(ctrl.label === data.label){
			ctrl.label = null;
		}else{
			ctrl.label = data.label;
		}
	};

	ctrl.openPdf = function(url){
		var urlLink = "/api-content" + url;
		$window.open(urlLink, '_blank');
	};
}
