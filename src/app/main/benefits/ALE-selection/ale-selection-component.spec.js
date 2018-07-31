'use strict';

var angular = require('angular');
require('angular-mocks');

var aleselection = require('./ale-selection-component');

describe('benefit-options', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var deferred;

	beforeEach(function() {
		var moduleName = 'app.main.benefits.ALE-selection';

		var mockDSService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.component('aleselection', aleselection);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.create = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS
		};

		ctrl = $componentController('aleselection', locals ,null);
	}));

	it('submit function test', function () {
		ctrl.submit();
		expect(DS.create).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});

	it('submit function test failure', function () {
		ctrl.submit();
		expect(DS.create).toHaveBeenCalled();
		deferred.reject({});
		$scope.$digest();
	});
});

