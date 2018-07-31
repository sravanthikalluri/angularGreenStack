'use strict';

require('./tn-table.component.scss');

module.exports = {
	template: require('./tn-table.component.html'),
	controller: ['moment',TnTableController],
	bindings:{
		title: '@',
		colTitles: '<',
		sortableTitles: '<',
		data: '<',
		canSelectRow: '<?',
		limitTo: '<?',
		allowExpand: '<?',
		color: '@',
		selectedRowChange: '&',
		emptyDataText: '@',
		filter: '<',
		updateHeadingsBackground: '&',
		filterByDateRange: '<',
		enableToolTips: '<',
		toolTipsTitle: '<',
		toolTipsHeader: '<',
		from: '@',
		customId:'@'
	}
};

function TnTableController(moment) {
	var ctrl = this;
	ctrl.dataProperties = [];
	ctrl.sortType = '';
	ctrl.sortReverse = false;
	ctrl.limit = true;

	ctrl.$onInit = function() {
		//Handle default situation
		if(ctrl.sortableTitles === undefined) {
			ctrl.sortableTitles = [];
		}
		if(ctrl.from === 'orgChart'){
			ctrl.isFocus = -1;
		}
		else{
			ctrl.isFocus = 0;
		}
		if(ctrl.allowExpand === undefined) {
			ctrl.allowExpand = true;
		}

		if(!ctrl.canSelectRow || ctrl.canSelectRow === false) {
			ctrl.canSelectRow = false;
			ctrl.selectedRow = -1;
		} else {
			ctrl.canSelectRow = true;
			ctrl.selectedRow = 0;
		}

		ctrl.emptyDataText = ctrl.emptyDataText || '';
		ctrl.sortTypeArray = [];
	};

	ctrl.dateRangeFilter = function () {
		var property = ctrl.filter.filterOnField;
		var startDate = ctrl.filter.startDate;
		var endDate = ctrl.filter.endDate;
		return function (item) {

			if (item[property] === null) return false;
			var itemDate = moment(item[property], 'MM/DD/YYYY');
	        var s = moment(startDate, "MM/DD/YYYY");
	        var e = moment(endDate, "MM/DD/YYYY");

	        if (itemDate >= s && itemDate <= e){
				return true;
			}
			return false;
		}
	}

	ctrl.getDataType = function(value) {
		if(isDate(value)) {
			return "date";
		}

		if(isHTML(value)) {
			return "html";
		}
		return "";
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



		angular.forEach(ctrl.dataProperties,function(prop, ind){
			if(ind === index){
				ctrl.sortTypeArray[index] = !ctrl.sortTypeArray[index];
			}
			else ctrl.sortTypeArray[ind] = false;
		});
		if(ctrl.dataProperties.length > 0) {
			var propertyName = ctrl.dataProperties[index];
			ctrl.sortReverse = ctrl.sortType === propertyName ? !ctrl.sortReverse : false;
			ctrl.sortType = propertyName;
			ctrl.sortOrder[index] = ctrl.sortReverse ? "Descending" : "Ascending";
		}

		var updatedMessage = ' (Sorted by ' + propertyName + ': ' + ctrl.sortOrder[index] + ')';
		angular.element('#updateSortableText').text(updatedMessage);
		setTimeout(function() {
			angular.element('#updateSortableText').html('');
		}, 1000);
	};
	fillDataPropertiesArray();

	function fillDataPropertiesArray() {
		if(ctrl.data && ctrl.data.length > 0 && ctrl.dataProperties.length === 0) {
			ctrl.dataProperties = Object.getOwnPropertyNames(ctrl.data[0]);
		}
		ctrl.sortOrder = [];
		ctrl.dataProperties.map(function (value, index) {
			ctrl.sortOrder[index] = 'none';
		});

	}

	ctrl.onUpdateHeadingBg = function () {
		return ctrl.updateHeadingsBackground({data: ctrl.color});
	};
}

function isDate (inputDate){
	var a = angular.isDate(inputDate);
	return a;
}

function isHTML(html) {
	var res = /<[a-z][\s\S]*>/.test(html);
  	return res;
}
