/**/'use strict';

var angular = require('angular');
require('angular-mocks');

var securityService = require('./security.service');

describe('security service component', function() {

	var $scope;
	var ctrl;
	var DS;
	var me;
	var $q;
	var $filter;
	var saveDeferred;
	var mockData = { data: {} };

	beforeEach(function() {

		var moduleName = 'trinet.main.settings.security-card';
		var mockDSService = function () {
			return {

			}
		};
		var mock$filter = function () {
			return {};
		};
		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$filter',mock$filter)
			.service('securityService', securityService);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,$q,_DS_,_$filter_) {
		var locals;
		$scope = $rootScope.$new();
		DS=_DS_;
		$filter=_$filter_;
		$q=$q;
		saveDeferred = $q.defer();

		DS.find= jasmine.createSpy('customId', '').and.returnValue(saveDeferred.promise);
		DS.find= jasmine.createSpy('secretQuestion', '').and.returnValue(saveDeferred.promise);
		DS.find= jasmine.createSpy('securityMfa', '').and.returnValue(saveDeferred.promise);
		DS.update= jasmine.createSpy('data.name', '', 'data.payload').and.returnValue(saveDeferred.promise);
		DS.create= jasmine.createSpy('data.name', '', 'data.payload').and.returnValue(saveDeferred.promise);
		me.fetch= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		me.save= jasmine.createSpy().and.returnValue(saveDeferred.promise);
		$q.all = jasmine.createSpy().and.returnValue(saveDeferred.promise);
		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS:DS,
			$filter:$filter,
		};

		// Initialize Component Controller
	//	ctrl = $componentController('securityService', locals, null);
	}));


	it('should initilize the variables',inject(function(securityService) {
		securityService.fetch();
		expect($q.all).toHaveBeenCalled();
		var results = [{
			customId : "",
			secretQuestion: "",
			securityMfa : ""
		}];
		deferred.resolve(results);
		$scope.$digest();
	}));

	it('should save and method is PUT',inject(function(securityService) {
		var data = {
			method :"PUT",
			name : "",
			payload: " "
		};
		securityService.save(data);

	}));

	it('should save and method is POST',inject(function(securityService) {
		var data = {
			method :"POST",
			name : "",
			payload: " "
		};
		securityService.save(data);
	}));

	it('should save and method default',inject(function(securityService) {
		var data = {
			method :"default",
			name : "",
			payload: " "
		};
		securityService.save(data);
	}));

});

