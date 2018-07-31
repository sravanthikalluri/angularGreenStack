'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var paychecksAndStatements = require('./paychecks-and-statements.component');

describe('paychecksAndStatements component', function () {
	var $componentController;
	var ctrl,$scope,DS;
	var gso,deferred,PaycheckDataService,SharedDataService;
	var mockData={
			allPaychecks: {
				"_error": "error",
				checkSummaries: [
					{"data": 123},
					{"data": 124},
					{"data": 125},
				]
			},
			"checks": [
				{
					"_error": "error"
				}
			],
			"data": {
				allPaychecks: {
					"checkSummaries": [],
					"voluntaryDeductions": []
				}
			}
		};
	/*var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'deferred': 'deferred',
		'PaycheckDataService': 'PaycheckDataService',
		'mockData': {
			allPaychecks: {
				"_error": "error",
				checkSummaries: [
					{"data": 123},
					{"data": 124},
					{"data": 125},
				]
			},
			"checks": [
				{
					"_error": "error"
				}
			],
			"data": {
				allPaychecks: {
					"checkSummaries": [],
					"voluntaryDeductions": []
				}
			}
		},
		moduleName: 'app.main.money.paychecks-and-statements',
		mockDSService: function () {
			return {}
		},
		momentService: function () {
			return function (dateString) {
				return moment(dateString).fromNow();
			};
		},
		PaycheckDataMockService: function () {
			return {};
		},
		gsoService: function () {
			return {
				getUtilService: function () {
					return {
						toggleComponentPermissions: function () {
						},
						splitSubComponentsPermissions: function () {
							return [
								{}
							]
						}
					}
				}
			}
		},
		locals: {}
	};*/

	beforeEach(function () {
		var moduleName= 'app.main.money.paychecks-and-statements';
		var mockDSService=function(){

		};
		var gsoService=function(){

		};
		var momentService=function(){
			return function (dateString) {
				return moment(dateString).fromNow();
			};
		};
		var mockSharedDataService = function () {

		};
		var PaycheckDataMockService=function(){
			return
		};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('gso', gsoService)
			.service('moment', momentService)
			.service('SharedDataService', mockSharedDataService)
			.service('PaycheckDataService', PaycheckDataMockService)
			.component('paychecksAndStatements', paychecksAndStatements);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _gso_, _PaycheckDataService_,_SharedDataService_) {
		$scope= $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		gso = _gso_;
		SharedDataService=_SharedDataService_;
		PaycheckDataService = _PaycheckDataService_;
		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		PaycheckDataService.fetchAllPaychecksWithDetails = jasmine.createSpy().and.returnValue(deferred.promise);
		PaycheckDataService.fetchAllPaycheckDetails= jasmine.createSpy().and.returnValue(deferred.promise);

		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		// Set up our dependencies to be injected into $componentController
		var locals = {
			$scope: $scope,
			DS: DS,
			gso: gso,
			PaycheckDataService: PaycheckDataService,
			moment: moment,
			SharedDataService:SharedDataService
		};

		// Initialize Component Controller
		ctrl = $componentController('paychecksAndStatements', locals, null);
	}));
	it('component should be initilize if', function () {
		var data = {
			_error: true,
			"allPaychecks":{
				"checkSummaries":[{

				}],
			},
			"data": {
				"voluntaryDeductions": [{
					"deductionName": "deduction"
				},
					{
						"deductionName": "deduction"
					}]
			}

		};
		/*ctrl.allPaychecks.checkSummaries.length'*/
		/*ctrl.allPaychecks={
			"checkSummaries":[{
				"id":""
			}]
		};*/

		ctrl.allPaychecks={
			"checkSummaries":[{

			}]
		};
		ctrl.$onInit();
		expect(PaycheckDataService.fetchAllPaychecksWithDetails).toHaveBeenCalled();
		deferred.resolve(data);
		$scope.$digest();

	});
	it('component should be initilize else part test', function () {
		var data = {
			_error:true,
			"_error.message":"",
			"allPaychecks": {
				"checkSummaries": [{

				}]
			},
			"data": {
				"voluntaryDeductions": [{
					"deductionName": "deduction"
				},
					{
						"deductionName": "deduction"
					}]
			}
		};
		/*ctrl.allPaychecks.checkSummaries.length'*/
		ctrl.allPaychecks={
			"checkSummaries":[{
				"id":""
			},]
		}
		ctrl.$onInit();
		expect(PaycheckDataService.fetchAllPaychecksWithDetails).toHaveBeenCalled();
		deferred.reject(data);
		$scope.$digest();

	});

	it('clicked function',function(){
		ctrl.clicked();
	});
	it('ctrl.setw2LableName function',function(){
		var countryCode="CA";
		ctrl.setw2LableName(countryCode);
	});
	it('toggleSymmetryVisibility  test case',function(){
		ctrl.toggleSymmetryVisibility();
	});
	/*it('onSelectedCheckChange  function test case',function(){
		ctrl.paychecks={
			"checkSummaries":[{
					"id":""
			},]
		}
		ctrl.onSelectedCheckChange(0);
		expect(PaycheckDataService.fetchAllPaycheckDetails).toHaveBeenCalled();
		deferred.resolve({});
		$scope.$digest();
	});*/
	/*it('onSelectedCheckChange  function catch block  test case',function(){
		ctrl.paychecks={
			"checkSummaries":[{
				"id":""
			},]
		};
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		}
		ctrl.onSelectedCheckChange(0);
		expect(PaycheckDataService.fetchAllPaycheckDetails).toHaveBeenCalled();
		deferred.reject(errorData);
		$scope.$digest();
	});*/
	/*it('onRangeChange  function test case',function(){
		ctrl.allPaychecks={
			"checkSummaries":[{
				"checkDt":""
			},]
		}
		ctrl.onRangeChange();
	});*/



	/*it('should call the ctrl.clicked method', function () {
		obj['ctrl'].clicked();
	});
	it('should call the ctrl.setw2LableName method', function () {
		obj['ctrl'].countryCode = 'CA';
		obj['ctrl'].w2LableName = 'paychecks-view-t4';
		obj['ctrl'].setw2LableName();
	});
	it('should call the DS.find method', function () {
		expect(obj['DS'].find).toHaveBeenCalledWith(obj['mockData']);
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();
	})

	it('should call the onSelectedCheckChange method', function () {
		/!*obj['ctrl'].$onInit();*!/
		obj['ctrl'].paychecks = [{
			"checkSummaries": [{
				"id": "12"
			}],

		}];
		obj['ctrl'].index = 0;
		obj['ctrl'].onSelectedCheckChange();
	})

	it('should call the ctrl.getEndDate', function () {
		obj['ctrl'].option = {
			"threeMonths": "",
			"sixMonths": "",
			"currentYear": "",
			"lastYear": "",
			"dateRange": ""
		}
		var pastDate = new Date();
		obj['ctrl'].getEndDate(obj['ctrl'].option);
		pastDate.setMonth(pastDate.getMonth() - 3);
	})*/
});

