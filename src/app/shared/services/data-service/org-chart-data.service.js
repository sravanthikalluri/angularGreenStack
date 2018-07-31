'use strict';

module.exports = OrgChartDataService;

/* @ngInject */
function OrgChartDataService(DS, $q, moment) {
	var svc = {};
	svc.fetchOrgChartByEmployeeID = fetchOrgChartByEmployeeID;
	svc.fetchOrgChartByEmployeeName = fetchOrgChartByEmployeeName;
	return svc;

	function fetchOrgChartByEmployeeID(id) {
		return DS.find('org-chart', id+'/org-chart?terminated&cache=flush');
	}

	function fetchOrgChartByEmployeeName(name) {
		return DS.find('org-chart', id+'/org-chart?terminated&name=' + name);
	}
}
