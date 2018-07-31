'use strict';

var angular = require('angular');
require('angular-mocks');
var tnNewAccount = require('./new-account.component');

describe('new-account Component', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'deferred':'deferred',
		'$state': '$state',
		'utilService': 'utilService',
		'$filter':'$filter',
		'formName': {
			$valid: true
		},
		'formName1': {
			$valid: false
		},
		'mockData': {
			results:"",
			countryCode:"CA"

		},
		'errorData':{
			data:{
				_error: {message:"error"}
			}
		},
		moduleName: 'app.main.money.direct-deposit.new-account',
		mockDSService: function () {
			return {}
		},
		mockGsoService: function()
		{
			return {}
		},
		mockUtilService: function(){
			return {
				mockAccount : function(p1) {

				}
			}

		},
		mock$state : function () {
			return {
				go: function () {
				}
			}
		},
		mock$filter: function () {
			return function () {
				return function () {}
			}

		},
		mockSharedDataService: function () {
			return {
				getAppSharedData: function () {
					return {}
				}
			}
		},
		locals: {}
	};


	beforeEach(function() {

		angular
			.module(obj.moduleName, [])
			.service('gso', obj.mockGsoService)
			.service('DS', obj.mockDSService)
			.service('utilService',obj.mockUtilService)
			.service('$state', obj.mock$state)
			.service('$filter', obj.mock$filter)
			.service('SharedDataService', obj.mockSharedDataService)
			.component('tnNewAccount', tnNewAccount);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_,_utilService_,$state,$filter){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;
		obj['utilService'] = _utilService_;
		obj['$state'] = $state;
		obj['$filter'] = $filter;
		obj['deferred'] = $q.defer();
		obj['DS'].create = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['gso'].getAppConfig = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['utilService'].filterNextDayDate=jasmine.createSpy().and.returnValue('');
		obj['utilService'].getErrorMessages=jasmine.createSpy().and.returnValue('');
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso'],
			utilService:obj['utilService'],
			$state: obj['$state'],
			$filter: obj['$filter']
		};

		obj['ctrl'] = obj['$componentController']('tnNewAccount', obj.locals ,null);
		obj['ctrl'].data = {};
		obj['ctrl'].existingAccounts=[{'priority':60.00},{'priority':70.00}]

	}));

	it('ctrl variables should be with mock data objects', function() {
		/*$compile('<span><i id="newAcctCreateClose"></i></span>');*/
		obj['$scope'].$digest();
		obj['ctrl'].$onInit();

	});
	it('closeModal function', function() {
		obj['ctrl'].closeModal();

	});
	it('setCanadian function', function() {
		obj['ctrl'].setCanadian('CA');

	});

	it('setFocus  function', function() {
		var e="9";
		obj['ctrl'].setFocus(e);
	});
	it('showAccountNo function', function() {
		var checked="Y";
		obj['ctrl'].showAccountNo(checked);
	});
	it('showAccountNo function and else condition', function() {
		var checked="N";
		obj['ctrl'].showAccountNo(checked);
	});
	it('state function', function() {
		obj['ctrl'].state();

	});
	it('resetPriority function', function() {
		obj['ctrl'].resetPriority([{"netBalance":"netBalance"}]);

	});
	it('resetPriority function', function() {
		obj['ctrl'].resetPriority([{"netBalance":false}]);

	});
	it('addAccountDetails  function', function() {
		obj['ctrl'].canadianUser = "fd";
		obj['ctrl'].addAccountDetails(obj['formName']);
		expect(obj['DS'].create).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});
	it('addAccountDetails  function', function() {
		obj['ctrl'].addAccount= {
			accountNumber: "544455455"
		}
				obj['ctrl'].addAccountDetails(obj['formName'])

		expect(obj['DS'].create).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});

	it('should test window open event', inject(function( setTimeout ) {
		setTimeout.flush();
	}));

	it('addAccountDetails  function', function() {
		obj['ctrl'].addAccountDetails(obj['formName']);
		expect(obj['DS'].create).toHaveBeenCalled();
		obj['deferred'].reject(obj['mockData']);
		obj['$scope'].$digest();

	});
	it('addAccountDetails  function', function() {
		obj['ctrl'].addAccountDetails(obj['formName1']);

	});
	it('addAccountDetails  function', function() {
		obj['ctrl'].showAmountSection="123"
		obj['ctrl'].selectedAmountType="percentage"
		obj['ctrl'].addAccount={
			percent:false
		}
		obj['ctrl'].addAccountDetails(obj['formName']);


	});


});


