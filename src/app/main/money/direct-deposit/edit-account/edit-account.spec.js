'use strict';

var angular = require('angular');
var moment=require('moment');
require('angular-mocks');

var tnEditAccount = require('./edit-account.component');

describe('edit-account component', function () {

	var ctrl;
	var $scope;
	var DS;
	var deferred;
	var $state;
	var $stateParams;
	var utilService;
	var constants;
	var $filter;
	var $uibModal;
	var SharedDataService;
	var gso;
	var mockTranslateFilter;
	var results = {

	};


	beforeEach(function () {
		var moduleName = 'app.main.money.direct-deposit.edit-account';
		mockTranslateFilter = jasmine.createSpy('translateFilter');

		var mockDSService = function () {
			return {}
		};
		var mock$state = function () {
			return {
				go: function () {

				}
			}
		};
		var mock$stateParams= function () {
			return {
				data: {
					accounts: [
						{effectiveDate: new Date()}
					],
					eligibility: {
						apeligible: false
					}
				}
			}
		};
		var mockUtilService = function () {
			return {}
		};
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString).format('MM/DD/YYYY');
			};
		};
		var mockConstantsService=function() {
			return {};
		};
		var mock$filter=function() {
			return {};
		};
		var mock$uibModal=function() {
			return {
				open : function () {
					return {
						"modal" :{
							"result": " "
						}
					}
				}
			};
		};
		var mockgsoService = function () {
			return {
				getUtilService: function () {
					return {
						filterDate: function () {
							return {}
						},
						checkTwoDates: function () {
							return {}
						}
					}
				}
			}
		};
		var mockSharedDataServiceService = function () {
			return {
				getAppSharedData: function () {
					return {}
				}
			}
		};
		var mockconstants = function () {
			return {
				warning: 'message',
				dateFormat: 'YYY-MM-DD'
			}
		};



		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('$state', mock$state)
			.service('constants',mockConstantsService)
			.service('moment',mockMomentService)
			.service('utilService',mockUtilService)
			.service('$stateParams',mock$stateParams)
			.service('$uibModal',mock$uibModal)
			.service('$filter',mock$filter)
			.service('constants',mockconstants)
			.service('gso', mockgsoService)
			.service('SharedDataService', mockSharedDataServiceService)
			.component('tnEditAccount', tnEditAccount);

		angular.mock.module(moduleName, function ($provide) {
			$provide.value('translateFilter', mockTranslateFilter);
		});

	});


	beforeEach(inject(function ($rootScope, $componentController, $q, _DS_,_utilService_,
								_$uibModal_,_$state_, _$stateParams_,_constants_,_$filter_,_gso_,
								_SharedDataService_,_moment_) {
		$scope = $rootScope.$new();
		DS = _DS_;
		utilService=_utilService_;
		$stateParams = _$stateParams_;
		$state = _$state_;
		$uibModal = _$uibModal_;
		constants=_constants_;
		$filter=_$filter_;
		gso=_gso_;
		SharedDataService=_SharedDataService_;
		moment=_moment_;

		deferred = $q.defer();
		DS.create = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.destroy = jasmine.createSpy().and.returnValue(deferred.promise);
		utilService.getLastPaycheckAmount=jasmine.createSpy().and.returnValue(deferred.promise);
		utilService.getErrorMessages=jasmine.createSpy().and.returnValue(deferred.promise);

		$stateParams.data = { accounts: [{}, {}]};

		$uibModal.open = jasmine.createSpy().and.returnValue('');
		constants={warning:""};

		var locals = {
			$scope: $scope,
			DS: DS,
			moment:moment,
			constants:constants,
			utilService:utilService,
			$state:$state,
			$stateParams:$stateParams,
			$filter:$filter,
			gso:gso,
			$uibModal:$uibModal,
			SharedDataService:SharedDataService
		};

		ctrl = $componentController('tnEditAccount', locals, null);
	}));

	/*it('ctrl variables should be with mock data objects', function () {
		ctrl.$onInit();
	});

	it('should display a prompt if there are any changes and success',function() {
		ctrl.doAnyChanges=true;
		ctrl.cancel();
		expect(DS.create).toHaveBeenCalled();
		deferred.resolve();
		$scope.$digest();
	});
	it('should display a prompt if there are any changes and failure',function() {
		ctrl.doAnyChanges=true;
		ctrl.cancel();
		expect(DS.create).toHaveBeenCalled();
		deferred.reject();
		$scope.$digest();
	});
	it('should display a prompt if there are any changes and false conditions',function() {
		ctrl.doAnyChanges=false;
		ctrl.cancel();
	});
	it('should go to direct-deposit page',function() {
		ctrl.goToView();
	});

	it('should add accounts',function() {
		ctrl.data=[{

		}];
		ctrl.addAccount();
	});
	it('should show msg if acounts are more than 10',function() {
		ctrl.data=[{

		},{

		},{},{},{},{},{},{},{},{},{},{},{}];
		ctrl.addAccount();
		/!*expect(ctrl.data.length).toGreater(10);*!/
	});

	it('should alter Error', function() {
		var response=[{
			"data":""
		}];
		ctrl.alertError(response);
	})
	it('should save the changes',function() {
		var results = {
			"data" : "data"
		};
		ctrl.data = {
			length:0
		};
		ctrl.eligibility= {
			apeligible: true,
			fsaeligible: true
		}
		ctrl.saveChanges();
		expect(DS.destroy).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();
	});

	/!*it('should not save the changes',function() {
		mockTranslateFilter.and.callFake(function (data, chunks) {
			// Ignore chunks since that's what the test expects.
			return data;
		});
		expect(mockTranslateFilter).toHaveBeenCalled();
		ctrl.invalid=true;
		ctrl.data=[{
			"effectiveDate":"",
			"netBalance":"1230"
		}];
		var results = {
			"data" : "data"
		};
		ctrl.eligibility= {
			apeligible: false,
			fsaeligible: false
		}
		ctrl.saveChanges();
		 expect(DS.create).toHaveBeenCalled();
		 deferred.resolve(results);
		 $scope.$digest();
	});*!/
	it('should prompt', function(){
		ctrl.prompt();
	});

	it('should reloadAccounts', function() {
		ctrl.reloadAccounts();
	});
	it('should populateData', function(){
		var item = {
			"data":"data"
		};
		ctrl.data = true;
		ctrl.populateData();
	});

	it('should onDateChange', function() {
		var date="03/14/2018";
		ctrl.datesArray= {
			length : 2
		};
		ctrl.eligibility=
			{
				minEffectiveDate : ""
			}
		var invalidDate =true;
		ctrl.onDateChange(date);
	});*/

});
