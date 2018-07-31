'use strict';

require('./tn-combo-box.component.scss');

module.exports = {
	template: require('./tn-combo-box.component.html'),
	controller: TnComboBoxTableController,
	bindings:{
		data: '<',
	    selectedObject : '=',
		selectStyle: '=',
		selectLabel: '=',
		onChange: '&'
	}
};

function TnComboBoxTableController(){
	var ctrl = this;

	ctrl.$onInit = function() {
		ctrl.data.forEach(function(obj, index){ctrl.data[index] = generateObject(obj)});
		ctrl.selectedObject = generateObject(ctrl.selectedObject);
	};

	ctrl.changeYear = function () {
		ctrl.onChange({year : ctrl.selectedObject});
	};
}

function generateObject(obj){
	var filteredObj = {};
	angular.forEach(Object.keys(obj),function(keyName,index){
		index ? filteredObj['value'] = obj[keyName] : filteredObj['key'] = obj[keyName]
	});
	return filteredObj;
}

