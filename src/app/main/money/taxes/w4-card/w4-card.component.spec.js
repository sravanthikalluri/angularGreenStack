'use strict';

var angular = require('angular');
var moment=require('moment');
var constants=require('constants');
require('angular-mocks');

var tnW4CardController = require('./w4-card.component');

describe('w4Card component', function (){

	var $componentController;
	var ctrl;
	var $scope;
	var deferred;
	var taxWithholdings;
	var taxWithholdingForm;
	var taxWithholdingUrls;
	var $uibModal;
	var gso;
	var utilService;
	var mockData = {
		taxWithholdings:[
			{"data":"fnf"},
			{"data1":"njsdf"}

		]
	};

	beforeEach(function() {
		var moduleName = 'app.main.money.taxes.w4-card';
		var mockMomentService = function() {
			return function(dateString) {
				return moment(dateString);
			};
		};
		var mockConstantsService=function() {
			return {
				selectedEffectiveDate: new Date().toString()
			};
		};

		var mocktaxWithholdings = function () {return{}};
		var mocktaxWithholdingForm = function () {return{}};
		var mocktaxWithholdingUrls = function () {return{}};
		var mock$uibModal = function () {return{
			open : function () {return {
				resolve : {
					data : function() {
						return {}
					}
				}
				}
			}
		}};
		var mockutilService = function () {return{}};
		var mockgsoService = function(){ return {
			getUtilService: function () {
				return {
					filterDate :function () {
						return {}
					},
					checkTwoDates :function () {
						return {}
					}
				}
			}
		}};
		angular
			.module(moduleName, [])
			.service('moment',mockMomentService)
			.service('taxWithholdings',mocktaxWithholdings)
			.service('constants',mockConstantsService)
			.service('taxWithholdingForm',mocktaxWithholdingForm)
			.service('taxWithholdingUrls',mocktaxWithholdingUrls)
			.service('$uibModal',mock$uibModal)
			.service('utilService',mockutilService)
			.service('gso',mockgsoService)
			.component('tnW4CardController', tnW4CardController);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q,_taxWithholdings_,_taxWithholdingForm_,_taxWithholdingUrls_,_$uibModal_,_utilService_,_gso_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		taxWithholdings=_taxWithholdings_;
		taxWithholdingForm = _taxWithholdingForm_;
		taxWithholdingUrls = _taxWithholdingUrls_;
		$uibModal = _$uibModal_;
		gso = _gso_;
		utilService = _utilService_;
		deferred = $q.defer();

		//spy
		taxWithholdings.fetch = jasmine.createSpy().and.returnValue(deferred.promise);
		taxWithholdingForm.fetch = jasmine.createSpy().and.returnValue(deferred.promise);
		utilService.filterCurrentEffectiveDate = jasmine.createSpy().and.returnValue(deferred.promise);
		$uibModal.open = jasmine.createSpy();

		var locals = {
			$scope: $scope,
			taxWithholdings:taxWithholdings,
			taxWithholdingForm:taxWithholdingForm,
			taxWithholdingUrls:taxWithholdingUrls,
			$uibModal:$uibModal,
			gso:gso,
			utilService:utilService,
			moment:moment,
			constants:constants
		};

		ctrl = $componentController('tnW4CardController', locals ,{
			/*resolve : {
				data : function () {

				}
			},*/
			prompt : function (data) {

			}
		});
	}));

	it('component should be initilize', function() {
		ctrl.$onInit();
		ctrl.taxWithholdings = [
			{"data":"fnf"},
			{"data":"njsdf"}

		]
		expect(taxWithholdings.fetch).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('should call the taxWithholdings',function () {
		ctrl.tax = "";
		ctrl.selectedEffectiveDate = {
			"split":{}
		}
		ctrl.taxWithholdings = [
		],
		ctrl.dateMenuObject = [
			{
				"selectedEffectiveDate":""
			}
		]
		ctrl.taxWithHoldingDataDisplay(ctrl.selectedEffectiveDate);
	});
	it('should prompt', function(){
		var data = " ";
		var modal = [{
			result : ""
		}];
		ctrl.prompt(data);
	});

	it('should edit', function () {
		ctrl.edit();
	});

});
