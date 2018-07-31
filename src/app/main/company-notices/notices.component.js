'use strict';

require('./notices.scss');

module.exports = {
	template: require('./notices.component.html'),
	controller: ['$stateParams',comapnynoticeController]
};

/* @ngInject */
function comapnynoticeController($stateParams) {
	var ctrl = this;
	ctrl.notices = $stateParams.id;
	ctrl.prorityType = {
		"0": "High",
		"1": "Medium",
		"2": "Low"
	};
	ctrl.getBodyParseValue = function(value){
		return  value.replace(/(?:\r\n|\r|\n)/g, '<br />');
	};
	ctrl.getPriority = function(key,item){
		var setPriotity = (key === item.priority.toString()) ?  true : false;
		return setPriotity;
	};
}
