'use strict';

var angular = require('angular');
require('angular-mocks');

var tnImportantNoticesCardController = require('./important-notices-card.component');

describe('important-notices-card component', function() {
	var $scope;
	var DS;
    var deferred;
	var $state;
	var $filter;
	var $uibModal;
	var ctrl;
	var $timeout;
	var results= [{
		res: {
			"keyName": "",
			title : {
				length : 66
			}
		},
		"announcement":{
			"title":"announcement Card"
		},
		"title":"announcement card"
	}];

	beforeEach(function() {

		var moduleName = 'trinet.shared.components.important-notices-card';
		var mockDSService = function () {
			return {};
		};
		/*var mock$timeout = function () {
			return {};
		};*/
		var mock$stateService = function () {
			return {
				transitionTo: function()
				{
					return { }
				}
			};
		};
		var mock$filterService = function () {
			return {};
		};
		var mock$uibModalService = function () {
			return {};
		};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('$state', mock$stateService)
			.service('$filter', mock$filterService)
			.service('$uibModal', mock$uibModalService)
		/*	.service('$timeout',mock$timeout)*/
			.component('tnImportantNoticesCardController',tnImportantNoticesCardController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController, _DS_, _$state_, _$filter_,_$timeout_, _$uibModal_,$q) {
		var locals;
		$scope = $rootScope.$new();
		DS = _DS_;
		$state = _$state_;
		$timeout=_$timeout_;
		$filter = _$filter_;
		$uibModal = _$uibModal_;
		deferred = $q.defer();
		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			DS:DS,
			$state:$state,
			$filter:$filter,
			$uibModal:$uibModal,
			$timeout:$timeout,
		};
		DS.find = jasmine.createSpy('notices', '').and.returnValue(deferred.promise);
		// Initialize Component Controller
		ctrl = $componentController('tnImportantNoticesCardController', locals, null);
	}));
	it('should initilize the components',inject(function( $timeout ) {
		ctrl.$onInit();
		var keys = [ {
			keyName : "current",
			index : 2
		}];
		$timeout.flush();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();

	}));
	it('should initilize the components and exception raised',inject(function( $timeout ) {
		ctrl.$onInit();
		$timeout.flush();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject(results);
		$scope.$digest();
	}));

/*	it('should show more ', function () {
		ctrl.setFullnotices = [{ }];
		ctrl.showMore();
	});*/

	it('should get priority ', function () {
		var key= {}, item={ priority: {toString : function(){

		}} };
		ctrl.getPriority(key,item);
	});

/*	it('should  more ', function () {
		var notices = {};
		var index='1';
		ctrl.more(notices,index);
	});*/
/*
	it('should getBodyParseValue ', function () {
		var value = {slice : function () {

			}};
		ctrl.getBodyParseValue(value);
	});*/
	it('should show Notices ', function () {
		ctrl.showNotices();
	});
});
