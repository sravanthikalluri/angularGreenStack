'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsOverview = require('./benefits-overview.component');

describe('benefits-overview component', function (){


	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'deferred': 'deferred',
		'$uibModal': '$uibModal',
		'$rootScope':'$rootScope',
		'mockData': {

			"enrollmentDeadline": {
				"enrollBeginDt": "1900-01-01",
				"enrollEndDt": "1900-01-01",
				"planYearBeginDt": "1900-01-01",
				"planYearEndDt": "1900-01-01",

				"confirmId": null,
				"confirmDt": "1900-01-01",
				"systemDefaultedElection": "N",
				"currentDate": null
			}

		},
		'mockData1': {

			"enrollmentDeadline": {

				"systemDefaultedElection": "",
				"currentDate": null
			}

		},
		moduleName: 'app.main.benefits.overview',
		mockDSService: function () {
			return {}
		},
		gsoMockService: function () {
					return {
				getAppConfig:function(){
					return {peoId: "AMB",
						companyId:"001"};
				}
			}
		},
		open:function(){
					return {
						peoId: "AMB",
						companyId:"001"
					}
		},

		locals: {}
	};
	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('gso', obj.gsoMockService)
			.service('$uibModal', obj.open)
			.component('benefitsOverview', benefitsOverview);
		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope,_$componentController_, _DS_, _gso_,_$uibModal_){
		obj['$scope'] = $rootScope.$new();
		obj['$rootScope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;
		obj['$uibModal'] = _$uibModal_;
		//obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);

		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			$rootScope: obj['$rootScope'],
			DS: obj['DS'],
			gso: obj['gso'],
			$uibModal: obj['$uibModal']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('benefitsOverview', obj.locals, null);

	}));

	it('ctrl variables should be with mock data objects', function () {
		//obj['ctrl'].$onInit();
		/*expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData'])
		obj['$scope'].$digest();*/
	});

	it('ctrl variables should be with mock data objects', function () {
		//obj['ctrl'].$onInit();
		/*expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData1'])
		obj['$scope'].$digest();*/
	});

});
