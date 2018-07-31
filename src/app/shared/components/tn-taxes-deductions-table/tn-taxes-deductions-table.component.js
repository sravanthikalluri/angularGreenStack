'use strict';

require('./tn-taxes-deductions-table.component.scss');

module.exports = {
	template: require('./tn-taxes-deductions-table.component.html'),
	controller: TnTaxesDeductionsTableController,
	bindings:{
		title: '@',
		colTitles: '<',
		sortableTitles: '<',
		preTaxes: '<',
		postTaxes: '<',
		totals: '<',
		subTitle1: '@',
		subTitle2: '@',
		canSelectRow: '<?',
		color: '@',
		selectedRowChange: '&',
		updateHeadingsBackground: '&',
		enableToolTips: '<',
		toolTipsTitle: '<',
		toolTipsTitle1: '<',
		toolTipsHeader: '<'
	}
};

function TnTaxesDeductionsTableController() {
	var ctrl = this;

	ctrl.dataProperties = [];
	ctrl.sortType = '';
	ctrl.sortReverse = false;

	ctrl.onUpdateHeadingBg = function () {
		return ctrl.updateHeadingsBackground({data: ctrl.color});
	};

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

