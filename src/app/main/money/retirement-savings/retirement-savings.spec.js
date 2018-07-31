
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnRetirementSavingsController = require('./retirement-savings.component');

describe('retirement-savings component', function () {
	var ctrl;
	var $scope,deferred
	var DS,RetirementSavingsDataService,$window, SharedDataService,companyNameService;
	beforeEach(function () {

		var moduleName = 'app.main.money.retirement-savings';
		var mockDSService = function () {

		};

		var mockRetirementSavingsDataService = function () {
			return {
				fetchAllRetirementSavingsDetails : function () {
					return {
						then : function () {
							results : {
								data:"data"
							}
						}
					}
				}
			}

		};

		var mock$window = function () {
			return {
				open : function() {}
			}
		};

		var mockSharedDataService = function () {
			return {
			getAppSharedData : function() {
				return {
				isSetGoal : false,

			  }
			}
			}
		};

		var mockcompanyNameService = function () {
			return {
				getPeoId : function () {

				}
			}
		};

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('RetirementSavingsDataService',mockRetirementSavingsDataService)
			.service('$window',mock$window)
			.service('SharedDataService',mockSharedDataService)
			.service('companyNameService',mockcompanyNameService)
			.component('tnRetirementSavingsController', tnRetirementSavingsController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_DS_,_RetirementSavingsDataService_,
								_$window_,_SharedDataService_,_companyNameService_,$q) {
		$scope = $rootScope.$new();
		DS=_DS_;
		RetirementSavingsDataService=_RetirementSavingsDataService_;
		$window=_$window_;
		SharedDataService=_SharedDataService_;
		companyNameService=_companyNameService_;
		deferred=$q.defer();

		var locals = {
			$scope: $scope,
			DS:DS,
			RetirementSavingsDataService:RetirementSavingsDataService,
			$window:$window,
			SharedDataService:SharedDataService,
			companyNameService:companyNameService,
		};

		DS.find= jasmine.createSpy().and.returnValue(deferred.promise);
		RetirementSavingsDataService.fetchAllRetirementSavingsDetails = jasmine.createSpy().and.returnValue(deferred.promise)
		ctrl = $componentController('tnRetirementSavingsController', locals, {
			data : [{ }]
		});
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
	/*	var result = [{

		},
			{

			}];*/
	     var results = {
	     	data : {
				vendorPlan :[ {
					vendorId : "MASSMU"
				}
				]
			},
			 ssoRetirementSavingsData : {
	     		 filter : function ()
				 {
					return function (r) {

					}
				 }
			 }
		 };
		var isHavingMasMutual = { length : 2 };
         var Tempdata=[{
			 results :{
				 "data":"data",
				 ssoRetirementSavingsData : {
					 filter : function ()
					 {

					 }
				 }
			 }
		 }]

		 deferred.resolve(results);
		 $scope.$digest();
		expect(RetirementSavingsDataService.fetchAllRetirementSavingsDetails).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();

	});

/*	it('ctrl variables should be with mock data objects and false value',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();

		var results = {
			data : {
				vendorPlan :[ {
					vendorId : "MASSMU"
				}
				]
			}
		};


		ctrl.isAMBMep = true;
		ctrl.isPASMepEnrolled = true;
		deferred.resolve(results);
		$scope.$digest();
		expect(RetirementSavingsDataService.fetchAllRetirementSavingsDetails).toHaveBeenCalled();
		deferred.resolve(results);
		$scope.$digest();

	});*/
	it('should the modal',function(){
		ctrl.data= {
			     federalAmount : ''
		        };
		var contribution = {}
		ctrl.modal(contribution);
	});
	it('should close alert',function(){
		ctrl.closeAlert();
	});
	it('should re direct',function(){
		ctrl.reDirect();
	});


});
