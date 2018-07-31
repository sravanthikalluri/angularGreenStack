'use strict';

module.exports = WorkInboxDataService;

/* @ngInject */
function WorkInboxDataService(DS, $q) {
	var svc = {};

	svc.fetchAssignedTasks = fetchAssignedTasks;
	svc.fetchUnAssignedTasks = fetchUnAssignedTasks;
	svc.fetchAllTasks = fetchAllTasks;

	return svc;

	function fetchAssignedTasks() {

		var def = $q.defer();

		DS.find('work-inbox', '/items?task=assignedToMe').then(function (results) {
			def.resolve(results);
		}).catch(function(error) {
			def.reject(error);
		});

		return def.promise;

	}

	function fetchUnAssignedTasks() {
		var def = $q.defer();

		DS.find('work-inbox', '/items?task=UnAssigned').then(function (results) {
			def.resolve(results);
		}).catch(function(error) {
			def.reject(error);
		});

		return def.promise;

	}



	function fetchAllTasks() {
		var def = $q.defer();

		var promises = [fetchAssignedTasks(),fetchUnAssignedTasks()];
		$q.all(promises).then(function(values) {
			def.resolve(filterTasks(values[0].workInbox[0].catagory).concat(filterTasks(values[1].catagory)));
		}).catch(function(error) {
			def.reject(error);
		});

		return def.promise;
	}

	/*--- private functions ---*/

	function filterTasks(tasks){
		return tasks.filter(function(item){
           return item.data.length;
		});
	}

}
