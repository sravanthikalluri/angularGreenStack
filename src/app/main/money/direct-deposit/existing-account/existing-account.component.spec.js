'use strict';

var angular = require('angular');
require('angular-mocks');

var tnExistingAccountController = require('./existing-account.component');

describe('existing-account component', function () {

	var deffered;
	var $scope;
	var ctrl;
	var $state;
	var $filter;
	var gso;
	var utilService;
	var constants;


	beforeEach(function () {

		var moduleName = 'app.main.money.direct-deposit.existing-account';

	var mock$state = function () {
		return {
			go : function () {
				return {};
			}
		}
	}
		var mock$filter  = function () {
			return {};
		};
		var mockutilService = function ()
		{
			return {
				getLastPaycheckAmount:function(){
					return {
						"paychecks":{ }

					};
				}
			};
		};
		var mockconstants = function () {
			return {};
		};

		var mockgsoService = function() {
			return {
				getUtilService:function(){
					return {
						filterDate:function(p1,p2) {
							return {};
						},
						/*	getCookie:function(){
                                return 'hghgjhg';
                            }*/
					};
				},
			}
		};
        var  lastPaycheckAmount;

		var eligibility = {
			minEffectiveDate:" "
		};
		angular
			.module(moduleName, [])

			.service('$state',mock$state)
			.service('$filter',mock$filter)
			.service('utilService',mockutilService)
			.service('constants',mockconstants)
			.service('gso',mockgsoService)
			.component('tnExistingAccountController', tnExistingAccountController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,
								_$state_,_$filter_,_utilService_,_constants_, _gso_,$q ) {
		$scope = $rootScope.$new();

		$state=_$state_;
		$filter=_$filter_;
		utilService=_utilService_;
		constants=_constants_;
		gso=_gso_;

		deffered = $q.defer();

		var locals = {
			$scope : $scope,
			$state : $state,
			$filter:$filter,
			utilService:utilService,
			constants:constants,
			gso:gso
		};

		ctrl = $componentController('tnExistingAccountController', locals, null);
	}));

	it('sholud be initilise the controller component',function(){
		ctrl.$onInit();
	});
	it('should edit the account',function () {
		var item = {
			"data":"data",
			split: function(){
				return ' ';
			}
		}
		ctrl.eligibility = {
			minEffectiveDate:" "
		}

		ctrl.editAccount(item);
	});
	it('should populate the data ',function () {
		var item = {
			"data":"data"
		};
		ctrl.totalAccounts=[{item : ""}];
		ctrl.populateData(item);
	});

	it('should populate the object ',function () {
		var item = {
			"data":"data",
		}
         var data;

			ctrl.totalAccounts={
				'item':[],
				length:'3'
			};

		var lastPaycheckAmount =  { utilService : function ()
		{
			return {
				getLastPaycheckAmount:function(){
					return {
						"paychecks":{ }

					};
				}
			};
		}
	}
		ctrl.populateData(data,lastPaycheckAmount);
	});

	/*	it('ctrl variables should be with mock data objects',function(){

            ctrl.$onInit();
            expect(DS.find).toHaveBeenCalled();
            deffered.resolve(results);
            $scope.$digest();
            expect(DS.find).toHaveBeenCalled();
            deffered.resolve(results);
            $scope.$digest();

        });
        it('ctrl variables should be with mock data objects , catch error if response fails',function(){
            ctrl.$onInit();
            expect(DS.find).toHaveBeenCalled();
            deffered.reject({});
            $scope.$digest();
        });
        it('should set ContentBackground',function(){
            $scope.setContentBackground();
        })*/
});
