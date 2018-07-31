'use strict';

var angular = require('angular');
require('angular-mocks');

var healthAndCounseling = require('./health-and-counseling.component');

describe('health and counseling component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var deferred;
	var mockData = {
		data: [
			{
				employmentInfo: {
					regularTemporary: {}
				}
			}
		]
	};


	beforeEach(function() {
		var moduleName = 'app.main.benefits.health-and-counseling';
		var mockDSService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.component('healthAndCounseling', healthAndCounseling);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS
		};

		ctrl = $componentController('healthAndCounseling', locals ,null);
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('$onInit function test reject', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({data: {_error : {message: 'message'}}});
		$scope.$digest();
	});


});

