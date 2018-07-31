/*Description : This is filter to filter the databased check box selection
 * Author : Raghavendra Kumar Bonthala
 */
'use strict';
module.exports = SearchCheckboxFilter;
// Filter to search the multi check box
function SearchCheckboxFilter() {
	return function (inputArray, selection) {
		if (angular.isDefined(selection) && selection.length === 0) {
			return inputArray;
		}
		var data = [];
		angular.forEach(inputArray, function (item) {
			for (var i = 0; i < selection.length > 0; i++) {
				if (item.department === selection[i] || item.position === selection[i] ||
					item.changeTypes === selection[i] || item.location === selection[i] || item.leavePlan === selection[i] ||
					item.posDesc === selection[i] || item.emplymntStatus === selection[i] || item.deptDesc === selection[i] ||
					item.workShortLocDesc === selection[i] || item.department === selection[i] || item.directManager === selection[i] ||
					item.workSupervisor === selection[i] || item.name === selection[i] || item.formStatus === selection[i] || item.deptName === selection[i] ||
					item.locationName === selection[i] || item.actorName === selection[i] || item.changeType === selection[i] || item.departement === selection[i] || item.manageDirect === selection[i] ) {
					data.push(item);
				}
			}
		});
		return data;
	};
}
