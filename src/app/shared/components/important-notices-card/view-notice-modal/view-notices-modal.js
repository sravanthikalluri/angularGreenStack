'use strict';
/*

require('./w4-legal-modal.component.scss');
*/

module.exports = {
	template: require('./view-notices-modal.html'),
	controller: ViewNoticesModalController,
	bindings: {
	  modalInstance: '<',
    		resolve: '<'
    	}
};

/* @ngInject */
function ViewNoticesModalController() {
	var ctrl = this;
	ctrl.prorityType = {
		"0": "High",
		"1": "Medium",
		"2": "Low"
	};
	ctrl.$onInit = function() {
		ctrl.data = ctrl.resolve.data;
		};
	ctrl.cancel = function() {
		ctrl.modalInstance.dismiss();
	};
	ctrl.getBodyParseValue = function(value){
		return  value.replace(/(?:\r\n|\r|\n)/g, '<br />');
	};
	ctrl.getPriority = function(key,item){
		var setPriotity = (key === item.priority.toString()) ?  true : false;
		return setPriotity;
	};
}
