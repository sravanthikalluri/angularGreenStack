'use strict';

var angular = require('angular');
require('angular-mocks');

var tnEditProfileAddress = require('./tn-edit-profile-address.component');

describe('tn-edit-profile-address component', function() {
	var $scope;
	var ctrl;
	var DS;
	var $state;
	var deferred;

	beforeEach(function() {
		var mockDSService=function(){

		};
		var mock$state=function(){

		}
		var moduleName = 'trinet.shared.components.tn-edit-profile-address';

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$state',mock$state)
			.component('tnEditProfileAddress', tnEditProfileAddress);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_DS_,$state,$q) {
		var locals;
		$scope = $rootScope.$new();
		DS=_DS_;
		// Set up our dependencies to be injected into $componentController
		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		locals = {
			$scope: $scope,
			DS:DS,
			$state:$state

		};

		// Initialize Component Controller
		ctrl = $componentController('tnEditProfileAddress', locals, null);
	}));
	it('should initilize the component',function() {
		ctrl.$onInit();
		var results= {
			"data":[
				{
					"message":"modal data message"
				}
			]
		};
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});

});

