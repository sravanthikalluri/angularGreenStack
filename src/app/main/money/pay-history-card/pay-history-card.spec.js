'use strict';

var angular = require('angular');
require('angular-mocks');

var payHistoryCard = require('./pay-history-card.component');

describe('pay-history-card component', function (){
	var obj={
		'$componentController':'$componentController',
		'ctrl':'ctrl',
		'$scope':'$scope',
		'DS':'DS',
		'deferred':'deferred',
		'$state':'$state',
		'$filter':'$filter',
		'innerFilterSpy':'innerFilterSpy',
		'allPaychecks':
			{
				"checkSummaries":[
				{
					"id": "SM_N_2016-07-15_21_2_0_2015-10-01",
					"netPay": 5275.06,
					"checkIssueDate": "2016-07-15",
					"checkDt": "2016-07-15",
					"checkKey": {
						"payGroup": "SM",
						"payPeriodEndDate": "2016-07-15",
						"payEndDt": "2016-07-15",
						"pageNo": "21",
						"lineNo": "2",
						"sepChk": "0",
						"offCycle": "N",
						"effDt": "2015-10-01"
					}
				}

			]
			},
			'mockData': {
			"checkSummaries":[
				{
					"id": "SM_N_2016-07-15_21_2_0_2015-10-01",
					"netPay": 5275.06,
					"checkIssueDate": "2016-07-15",
					"checkDt": "2016-07-15",
					"checkKey": {
						"payGroup": "SM",
						"payPeriodEndDate": "2016-07-15",
						"payEndDt": "2016-07-15",
						"pageNo": "21",
						"lineNo": "2",
						"sepChk": "0",
						"offCycle": "N",
						"effDt": "2015-10-01"
					}
				}

			]

		},
		'errorData' : {
			data:{
					 message:"error",
					_statusCode: "404"
			}
		},
		moduleName : 'app.main.money.pay-history-card',
		mock$state : function () {
			return {
				go: function () {
					//return app.main.money.paychecks-and-statements;
				}
			}
		},
		mock$filter : function () {
			return {};
		},
		mockDSService : function(){ return {}},
		locals :{}

	}

	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('$state',obj.mock$state)
			.service('$filter',obj.mock$filter)
			.component('payHistoryCard', payHistoryCard);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,$state,$filter){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['$filter'] = $filter;
		obj['$state'] =$state;
		obj['deferred'] = $q.defer();

		obj['innerFilterSpy']  = jasmine.createSpy();
		obj['$filter'] = jasmine.createSpy().and.returnValue(obj['innerFilterSpy']);

		obj['DS'].find = jasmine.createSpy('paychecks', '').and.returnValue(obj['deferred'].promise);

		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			$state:obj['$state'],
			$filter:obj['$filter']

		};

		obj['ctrl'] = obj['$componentController']('payHistoryCard', obj.locals ,{
			totalAccounts : [{ }]
		});
	}));

	it('ctrl variables should be with mock data objects and success', function() {

		obj['ctrl'].$onInit();
		expect(obj['$filter']).toHaveBeenCalledWith('translate');
		expect(obj['innerFilterSpy']).toHaveBeenCalledWith('no-pay-history');
		obj['deferred'].resolve();
		obj['$scope'].$digest();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});
	it('ctrl variables should be with mock data objects and exception', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		var error = { data : { _error: { message : " error Message"}}};
		obj['deferred'].reject(error);
		obj['$scope'].$digest();
	});

	it('should viewAllPayChecks', function() {
		obj['ctrl'].viewAllPayChecks();
	});

});
