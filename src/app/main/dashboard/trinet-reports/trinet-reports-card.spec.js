'use strict';

var angular = require('angular');
var moment = require('moment')
require('angular-mocks');

var tnTrinetReportsCard = require('./trinet-reports-card.component');

describe('trinet-reports-card component', function () {
	var ctrl;
	var $scope;
	var DS;
	var $window;
	var deffered;
	var SharedDataService;

	beforeEach(function () {
		var moduleName = 'app.main.dashboard.trinet-reports';
		 var mockDS = function() {
			return {}
		 }
         var mockMomentService = function() {
		 	return {};
		 }

		var mock$window = function() {
			return {
				open:function(p1,p2){

				},
				sessionStorage:{
					getItem:function(data){
						return data;
					},
					setItem:function(data,data1) {

					}
				}
			};
		};

		var mockSharedDataService = function() {
			return {
				getAppSharedData:function() {
					return {
						reportsuiBaseUrl:''
					}
				}
			}
		}

		angular
			.module(moduleName, [])
			.service('DS',mockDS)
			.service('$window',mock$window)
			.service('SharedDataService',mockSharedDataService)
			.service('moment',mockMomentService)
			.component('tnTrinetReportsCard', tnTrinetReportsCard);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_$window_,$q,_SharedDataService_) {
		$scope = $rootScope.$new();
		DS = _DS_;
		$window = _$window_;
		SharedDataService = _SharedDataService_;
		deffered = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deffered.promise);
		var locals = {
			$scope: $scope,
			DS:DS,
			$window:$window,
			moment:moment,
			SharedDataService:SharedDataService
		};
		ctrl = $componentController('tnTrinetReportsCard', locals, {
			isShow:true
		});
	}));

	it('should  view the alerts',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve({terminationDate:'03-02-2018'});
		$scope.$digest();
	});
	it('should  view the alerts',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.reject({});
		$scope.$digest();
	});
	it('should redirect to reports page',function() {
		ctrl.reDirectToReports();
	})
});
