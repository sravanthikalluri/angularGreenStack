'use strict';

var angular = require('angular');
var moment=require('moment');
var constants=require('constants');
require('angular-mocks');

var tnHolidayCalendar = require('./holiday-calendar.component');

describe('holiday-calendar component', function (){

	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var $filter;
	var $window;
	var $http;
	var deferred;
	var innerFilterSpy;

	var mockData = {

		"companyHolidayDetails":
			[{
			"selectedYear" : "2-02-2017"
			},
			{
				"selectedYear" : "08-08-2017"
			}],

	};

	beforeEach(function() {
		var moduleName = 'trinet.main.company.holiday-calendar';
		 var mockMomentService = function() {
		 	return function(dateString) {
				return moment(dateString);
		 	};
		 };
		var mockConstantsService=function() {
			return {};
		};
		var mock$window = function () {
         return {
         	open : function () {

			}
		 }
		};

		var mock$http = function () {

		};

		var mockDSService = function(){ return {}};
		var mockGSOService = function(){
			return {
				getUtilService: function () {
					return {
						getCookie: function () {
							return {};
						}
					}
				},
				getAppConfig: function () {
					return {};
				}
			}
		};
		var mock$filter = function () {
			return {

			}
		};
		angular
			.module(moduleName, [])
			.service('moment',mockMomentService)
			.service('DS', mockDSService)
			.service('gso', mockGSOService)
			.service('$window', mock$window)
			.service('$http', mock$http)
			.service('$filter', mock$filter)
			.service('constants',mockConstantsService)
			.component('tnHolidayCalendar', tnHolidayCalendar);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_,_gso_,_moment_,_$filter_,_$http_,_$window_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		$filter=_$filter_;
		$http=_$http_;
		gso=_gso_;
		moment=_moment_;
		$window=_$window_;
		deferred = $q.defer();

		innerFilterSpy = jasmine.createSpy();
		$filter = jasmine.createSpy().and.returnValue(innerFilterSpy);

		DS.find = jasmine.createSpy('holiday', '',{}).and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy('newHoliday-list','',{}).and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy('activeHolidayCompany','',{}).and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy('holiday-list', '',{}).and.returnValue(deferred.promise);


		var locals = {
			$scope: $scope,
			DS: DS,
			gso:gso,
			moment:moment,
			$filter:$filter,
		    $http:$http,
			$window:$window,
			constants:constants
		};

		ctrl = $componentController('tnHolidayCalendar', locals ,null);
	}));

	it('component should be initialized', function() {
		ctrl.$onInit();
		expect($filter).toHaveBeenCalledWith('translate');
		expect(innerFilterSpy).toHaveBeenCalledWith("holiday-calendar-select");

		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});
	it('nextHoliday failed', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var errorData = {
			data:{
				_error: {message:"error"}
			}
		};
		deferred.reject(errorData)
		$scope.$digest();
	});


	/*it('change year function and true value', function() {
		var year= {
			"key":"2017"
		};
		var response={
			holidayDetails: {
				sort : function (a,b) {

				},
				map : function (holiday) {

				}
			},
			"data":"data"
		};
		ctrl.activeHolidayCompany = " ";
		ctrl.changeYear(year);
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();
	});*/

	it('change year function yields failure', function() {
		var year= {
			"key":"2017"
		};
		ctrl.changeYear(year);
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({data: {_error: {}}});
		$scope.$digest();
	});

	it('', function(){

	})

	it('should open a pdf file',function() {
		ctrl.holidayListOpen();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});
	it('should reject pdf file to open',function() {
		ctrl.holidayListOpen();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject(mockData);
		$scope.$digest();
	});
	it('should throw exception if no nextHoliday',function() {
		ctrl.holidayListOpen();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject(mockData);
		$scope.$digest();
	});
	/*it('should holidayListOpen with true value ',function(){
		ctrl.activeHolidayCompany = " ";
		ctrl.holidayResponse = {holidayDetails : " " };
		ctrl.holidayListOpen();
	});*/
	it('should holidayListOpen with false value ',function(){
		ctrl.holidayListOpen();
	 });

	/*it('getHoliday list if no holiday', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData)
		$scope.$digest();
		var holiday = {
			date: '02-02-2017',
			desc: "holiday"
		};
	});*/

});
