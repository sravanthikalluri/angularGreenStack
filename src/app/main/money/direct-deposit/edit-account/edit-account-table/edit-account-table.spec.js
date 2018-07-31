'use strict';

var angular = require('angular');
var constants = require('constants')
require('angular-mocks');

var tnEditAccountTableController = require('./edit-account-table.component');

describe('edit-account-table component', function () {

	var ctrl;
	var $scope;
	var utilService;
	var $filter;
	var $uibModal;
	var deferred;
	var mockTranslateFilter;
	var innerFilterSpy;

	beforeEach(function () {

		var moduleName = 'app.main.money.direct-deposit.edit-account.edit-account-table';
		var mockUtilService = function() {
			return {}
		};
		var mock$filter = function() {
			return { }
		};
		var mockconstants =function() {
			return {}
		};
		var mock$uibModal= function() {
			return {
				open:function () {
					return{
						modal:{
							result:''
						}
					}
				}
			}
		};
	   mockTranslateFilter = jasmine.createSpy('translateFilter');
		angular
			.module(moduleName, [])
			.service('utilService',mockUtilService)
			.service('$uibModal',mock$uibModal)
			.service('$filter',mock$filter)
			.service('constants',mockconstants)
			.component('tnEditAccountTableController', tnEditAccountTableController);

		angular.mock.module(moduleName, function ($provide) {
			$provide.value('translateFilter', mockTranslateFilter);
		});
	});
	beforeEach(inject(function ($rootScope, $componentController,_utilService_,_$filter_,
								_$uibModal_,_constants_,$q) {
		$scope = $rootScope.$new();
		utilService=_utilService_;
		$filter=_$filter_;
		constants=_constants_;
		$uibModal = _$uibModal_;
		deferred = $q.defer();
		innerFilterSpy = jasmine.createSpy();
		$filter = jasmine.createSpy().and.returnValue(innerFilterSpy);

	/*	DS.update = jasmine.createSpy('onboarding-post-task','',{},{}).and.returnValue(deferred.promise);
		$http.get = jasmine.createSpy('',{}).and.returnValue(deferred.promise);
		$http.put =  jasmine.createSpy('').and.returnValue(deferred.promise);*/
		$rootScope.$on =  jasmine.createSpy('onNewAccountModalClose').and.returnValue(deferred.promise);
		var locals = {
			$scope: $scope,
			$uibModal:$uibModal,
			utilService:utilService,
			$filter:$filter,
			constants:constants

		};
		ctrl = $componentController('tnEditAccountTableController', locals, {
			data : { data: {
				data : { }
				}}
		});
	}));

	it('component init()', function() {
			ctrl.$onInit();
		expect($filter).toHaveBeenCalledWith('translate');
		expect(innerFilterSpy).toHaveBeenCalledWith('money.direct_deposit.orderHelpText');
		expect(innerFilterSpy).toHaveBeenCalledWith('money.direct_deposit.netBalanceHelpText');
		expect(innerFilterSpy).toHaveBeenCalledWith('money.direct_deposit.depositHelpText');
		expect(innerFilterSpy).toHaveBeenCalledWith('money.direct_deposit.estimatedAmountHelpText');
	});

	/*it('should confirmDeleteAccount and if condition', function () {
		ctrl.data = [{fsaAccount : " "},{}];
		ctrl.confirmData = {
			yesButton : "money.direct_deposit.dd-yes-delete",
			messsag : "confirm-fsa-delete "
		};
		ctrl.confirmDeleteAccount(1)
	});*/
/*	it('should confirmDeleteAccount and else condition', function () {
		ctrl.data = [{apAccount : " "},{}];
		ctrl.confirmData = {
			yesButton : "money.direct_deposit.dd-yes-delete",
			messsag : "confirm-ap-delete "
		};
		ctrl.confirmDeleteAccount(1)
	});*/
/*
	it('should deleteAccount', function () {
		ctrl.data = [{ }, { }];
		ctrl.deleteAccount(1);
	});
	it('should onChange and true condition ', function () {
		var index = 1;
		var value=  'undefined';
		var type = 'dollar';
		ctrl.onChange(index,type,value);
	});
	it('should onChange and else condition ', function () {
		var index = 1;
		var value=  ' ';
		var type = 'percentage';
		ctrl.onChange(index,type,value);
	});*/

});
