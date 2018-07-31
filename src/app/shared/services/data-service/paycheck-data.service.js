'use strict';

module.exports = PaycheckDataService;

/* @ngInject */
function PaycheckDataService(DS, $q, moment,SharedDataService) {
	var svc = {};

	svc.fetchAllPaychecks = fetchAllPaychecks;
	svc.fetchAllPaycheckDetails = fetchAllPaycheckDetails;
	svc.fetchAllPaychecksWithDetails = fetchAllPaychecksWithDetails;

	return svc;

	function fetchAllPaychecks() {
		var def = $q.defer();
		DS.find('paychecks', '').then(function (results) {
			//storing this payload data to retrive in dashboard page
			SharedDataService.getAppSharedData().payCheckBackUp = results;
			def.resolve(results);
		}).catch(function(error) {
			def.resolve(error.data);
		});

		return def.promise;
	}

	function fetchAllPaycheckDetails(payCheckId) {
		var def = $q.defer();
		var response = [];

		var getDetails = function(p) {
			var details = p;
			details.detail = p.detail;
			details.summary = p.getSummary();
			details.payPeriod = p.getPayPeriod();
			response.push(details);
		}

		DS.find('paycheckDetails', payCheckId).then(function(details) {
			getDetails(details);
			def.resolve(response);
		});

		return def.promise;
	}

	function fetchAllPaychecksWithDetails() {
		var def = $q.defer();

		var promises = [fetchAllPaychecks()];
		$q.all(promises).then(function(values) {
			def.resolve(values[0]);
		});

		return def.promise;
	}
}
