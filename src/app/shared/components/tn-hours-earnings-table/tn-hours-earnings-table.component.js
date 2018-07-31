'use strict';

require('./tn-hours-earnings-table.component.scss');

module.exports = {
	template: require('./tn-hours-earnings-table.component.html'),
	controller: TnHoursEarningsTableController,
	bindings:{
		title: '@',
		colTitles: '<',
		sortableTitles: '<',
		data: '<',
		totals: '<',
		canSelectRow: '<?',
		color: '@',
		selectedRowChange: '&',
		updateHeadingsBackground: '&',
		enableToolTips: '<',
		toolTipsTitle: '<',
		toolTipsHeader: '<'
	}
};

function TnHoursEarningsTableController() {
	var ctrl = this;

	ctrl.dataProperties = [];
	ctrl.sortType = '';
	ctrl.sortReverse = false;


	ctrl.$onInit = function() {


		//Handle default situation
		if(ctrl.sortableTitles === undefined) {
			ctrl.sortableTitles = [];
		}

		if(!ctrl.canSelectRow || ctrl.canSelectRow === false) {
			ctrl.canSelectRow = false;
			ctrl.selectedRow = -1;
		} else {
			ctrl.canSelectRow = true;
			ctrl.selectedRow = 0;
		}


	};

	ctrl.onUpdateHeadingBg = function () {
		return ctrl.updateHeadingsBackground({data: ctrl.color});
	};

	ctrl.getDataType = function(value) {
		if(isDate(value)) {
			return "date";
		}

		if(isNumber(value)) {
			return "number";
		}

		if(isHTML(value)) {
			return "html";
		}
	}



	ctrl.onRowSelected = function (item, sortedIndex) {
		if(ctrl.canSelectRow) {
			ctrl.selectedRow = sortedIndex;
			var actualIndex = ctrl.data.indexOf(item);
			ctrl.selectedRowChange({$event: {selectedRow: actualIndex}});
		}
	}

	ctrl.orderBy = function(index) {
		ctrl.selectedRow = -1;
		ctrl.selectedHeader = index;

		fillDataPropertiesArray();

		if(ctrl.dataProperties.length > 0) {
			var propertyName = ctrl.dataProperties[index];
			ctrl.sortReverse = ctrl.sortType === propertyName ? !ctrl.sortReverse : false;
			ctrl.sortType = propertyName;
		}
	}

	function fillDataPropertiesArray() {
		if(ctrl.data.length > 0 && ctrl.dataProperties.length === 0) {
			ctrl.dataProperties = Object.getOwnPropertyNames(ctrl.data[0]);
		}
	}
};

function isDate (inputDate){
	var a = angular.isDate(inputDate);
	return a;
}
function isNumber (inputNumber){
	return !isNaN(inputNumber);
}

function isHTML(html) {
  var doc = document.createElement('div');
  doc.innerHTML = html;
  return ( doc.innerHTML === html );
}


