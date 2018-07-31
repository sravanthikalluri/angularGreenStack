'use strict';

var angular = require('angular');
require('angular-mocks');
var moment = require('moment');
var paycheckHistoryTable = require('./paycheck-history-table.component');

describe('paycheck-history-table component', function () {
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'$filter':'$filter',
		'moment':'moment',
		moduleName: 'app.main.money.paycheck-history-table.paycheck-history-table',
		mock$filter : function () {
			return function () {
				return function () {}
			}
		},
		mockMomentService : function() {
			return function (dateString) {
				return moment(dateString)
			}
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('$filter',obj.mock$filter)
			.service('moment',obj.mockMomentService)
			.component('paycheckHistoryTable', paycheckHistoryTable);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_,$filter,_moment_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['moment'] = _moment_;
		obj['$filter'] = $filter;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			moment:obj['moment'],
			$filter:obj['$filter']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('paycheckHistoryTable', obj.locals, null);
	}));
	it('onInit function', function () {
		obj['ctrl'].$onInit();
	});
	it('onChanges function', function () {
		obj['ctrl'].changesobj={
			checkSummaries:{
				currentValue:""
			}
		}
		obj['ctrl'].$onChanges(obj['ctrl'].changesobj);
	});
	it('onViewDetailsClicked function', function () {
		obj['ctrl'].viewDetailsClicked= function(){}
		obj['$scope'].onViewDetailsClicked(1);
	});
	it('prepareCheckData  function', function () {
		obj['ctrl'].arr = [
			{
					checkKey:{
						payEndDt:""
					},
					checkDt:"",
					checkNumber:"",
					netPay:""
			}

		]
		obj['ctrl'].prepareCheckData(obj['ctrl'].arr);
	});



});

