'use strict';

module.exports = UserServiceLocal;

/* @ngInject */
function UserServiceLocal(DS, $timeout, $filter, $q) {
	var service = {}

	var userStore = DS.defineResource({
		name: 'user',
		basePath: 'assets/json',
		endpoint: 'user.json'});

	service.fetchAll = fetchAll;
	service.fetchByID = fetchByID;
	service.fetchByEmployeeID = fetchByEmployeeID;
	service.fetchBySSN = fetchBySSN;
	service.fetchByCustomID = fetchByCustomID;

    return service;

	function fetchAll() {
		var deferred = $q.defer();
        deferred.resolve(getUsers().then(function(users){
        	deferred.resolve(users);
        }));

    	return deferred.promise;
	}

	function fetchByID(id) {
		return userStore.find(id);
    }

    function fetchByEmployeeID(employeeID) {
    	var deferred = $q.defer();
    	getUsers()
    		.then(function(users) {
    			filterAndResolve(deferred, users, { employee_id: employeeID });
    		});

		return deferred.promise;
    }

    function fetchBySSN(ssn) {
        var deferred = $q.defer();
    	getUsers()
    		.then(function(users) {
    			filterAndResolve(deferred, users, { ssn: ssn });
    		});

		return deferred.promise;
    }

    function fetchByCustomID(customID) {
        var deferred = $q.defer();
    	getUsers()
    		.then(function(users) {
    			filterAndResolve(deferred, users, { custom_id: customID });
    		});

		return deferred.promise;
    }

    function filterAndResolve(q, users, params) {
    	var filtered = $filter('filter')(users, params);
		var user = filtered.length ? filtered[0] : null;
		q.resolve(user);
    }

    function getUsers() {
    	return userStore.findAll();
    }
}
