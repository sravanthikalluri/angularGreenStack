'use strict';

var angular = require('angular');
require('angular-mocks');

var carrierContactInfo = require('./carrier-contact-info.component');

describe('carrier-contact-info component', function (){
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'deferred': 'deferred',
		'mockData': {
		},
		'errorData':{
			data:{
				_error: {message:"error"}
			}
		},
		moduleName: 'app.main.benefits.resources.additional-resources.carrierContactInfo',
		mockDSService: function () {
			return {}
		},


		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.component('carrierContactInfo',carrierContactInfo);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController, $q, _DS_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] =$componentController;
		obj['DS'] = _DS_;

		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);



		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS']

		};

		obj['ctrl'] = obj['$componentController']('carrierContactInfo', obj.locals ,null);
	}));





	it('ctrl variables should be with mock data objects', function() {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData'])
		obj['$scope'].$digest();
	});

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();

		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].reject(obj['errorData'])
		obj['$scope'].$digest();

	});

});
