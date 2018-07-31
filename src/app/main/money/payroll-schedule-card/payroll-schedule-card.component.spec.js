
'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var tnPayrollScheduleCardController = require('./payroll-schedule-card.component');

describe('payroll-schedule-card component', function () {

	var ctrl;
	var $scope;
	var DS;
	var utilService;
	var $timeout;
	var gso;
	var sharedProperties;
	var deffered;
	var result = {
		nextCheckDt : {},
		companyInfo:[{
			companyId:'',
			companyDesc:'',
			peoId:''
		}]
	}
	beforeEach(function () {

		var moduleName = 'app.main.money.payroll-schedule-card';

		var mockDSService = function(){
			return {};
		};
		var mockutilService= function () {
			return {};
		};

		var mock$timeout = function () {
			return {};
		};
		var mockgso =function () {
			return {
				getUtilService: function () {
					return {
						splitSubComponentsPermissions: function (p1) {
							return {
								'componentsPermissions' :'35'
							}
						},
					};
				},
			};
		}
		var mocksharedProperties =function () {
			return {
				getComponentPermissions : function () {
				return {};
				}
			};
		};
		var mockmoment =  function () {
			return {};
		};


		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('utilService',mockutilService)
			.service('$timeout',mock$timeout)
			.service('gso',mockgso)
			.service('moment',mockmoment)
			.service('sharedProperties',mocksharedProperties)
			.component('tnPayrollScheduleCardController', tnPayrollScheduleCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_utilService_,_moment_,_$timeout_,_gso_,_sharedProperties_,$q) {
		$scope = $rootScope.$new();
        DS=_DS_;
		utilService=_utilService_;
		moment=_moment_;
		$timeout=_$timeout_;
		gso=_gso_;
		sharedProperties=_sharedProperties_;
		deffered = $q.defer();
		var locals = {
			$scope: $scope,
			DS:DS,
			utilService:utilService,
			moment:moment,
			$timeout:$timeout,
			gso:gso,
			sharedProperties:sharedProperties,
		};
		DS.find = jasmine.createSpy('paychecks', '').and.returnValue(deffered.promise);
		DS.find = jasmine.createSpy('payrollSchedule', '').and.returnValue(deffered.promise);
		ctrl = $componentController('tnPayrollScheduleCardController', locals, {


		});
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(result);
		$scope.$digest();
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(result);
		$scope.$digest();

	});
	it('ctrl variables should be with mock data objects , catch error if response fails',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var result = {
			nextCheckDt : " "
		};
		deffered.reject({});
		$scope.$digest();
		expect(DS.find).toHaveBeenCalled();
		deffered.reject({});
		$scope.$digest();
	});
	it('should be display the modal',function(){
		ctrl.btnClick();
	});
	payrollMonth.firstDateOfMonth
	it('should if the month is change', function () {
		var payrollSchedule = {};
		var payrollMonth = { firstDateOfMonth : {} };
		ctrl.isMonthChange(payrollSchedule);
	});
	it('should pay Date sorting', function () {
		var payrollData = 'biweekly';
		ctrl.payDateSorting(payrollData);
	})

	it('should pay Date sorting', function () {
		var name = 'dfs';
		ctrl.isPayrollAdmin(name);
	})

});
