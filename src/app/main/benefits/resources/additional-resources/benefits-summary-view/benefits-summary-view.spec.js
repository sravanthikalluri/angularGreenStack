'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsSummaryView = require('./benefits-summary-view.component');

describe('benefits-summary-view component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;


	var deferred;
	var $uibModal;

	var mockData = {
		benefitsSummaryViewPlans: {
			benefitProgramList: {}
		},
		benefitsSummaryLinks: [{}, {}]
	};
	var errorData = {
		data:{
			_error: {message:"error"}
		}
	};


	beforeEach(function() {
		var moduleName = 'app.main.benefits.resources.additional-resources-benefits-summary-view';

		var mockGsoService = function(){ return {
			getUtilService: function () {
				return {
					filterDate: function () {
						return {};
					}
				}
			}
		}};
		var mockDSService = function(){ return {}};
		var mockUIBModalService = function(){ return {
			open : function () {
				resolve : {
					return {
					modalData : function(){
						return {};
					},
					programData : function()
					{
						return {};
					}
					}
				}
			}
		}};
		var mockImageConfigService = function(){ return {}};

		angular
			.module(moduleName, [])
			.service('gso', mockGsoService)
			.service('DS', mockDSService)
			.service('$uibModal', mockUIBModalService)
			.component('benefitsSummaryView', benefitsSummaryView);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_, _$uibModal_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy('benefits-summary-links','').and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy('benefits-summary-view-plans','').and.returnValue(deferred.promise);

		gso = _gso_;
		gso.getAppConfig = jasmine.createSpy().and.returnValue('');

		$uibModal = _$uibModal_;
		$uibModal.open = jasmine.createSpy();


		var locals = {
			$scope: $scope,
			DS: DS,
			gso:gso,
			$uibModal: $uibModal,

		};

		ctrl = $componentController('benefitsSummaryView', locals ,null);
		ctrl.childParentAlertMsg = function () {

		}
	}));

	it('ctrl variables should be with mock data objects', function() {
		var response = {
			"benefitsSummaryViewPlans": {
				"benefitProgramList": [{
					"benefitProgram": "0018BG",
					"defaultProgram": "Y",
					"description": "Tier 1"
				}, {
					"benefitProgram": "0018BF",
					"defaultProgram": "N",
					"description": "Tier 2"
				}, {
					"benefitProgram": "001812",
					"defaultProgram": "N",
					"description": "Tier 2 NJ"
				}],
				"textList": null,
				"currentPlanStartDate": "2018-01-01",
				"currentPlanEndDate": "2018-12-31",
				"customIndicator": true,
				"employeeBenefitProgram": "001812",
				"employeePayFrequency": "B",
				"groupDesc": "Group By Benefit Class",
				"isAdmin": true,
				"oeDisplay": null,
				"payFrequencyList": ["B"],
				"pdfUrl": null,
				"planStartDate": null,
				"planEndDate": null,
				"showText": null,
				"stateCode": null,
				"bPsBenSumNext": null
			}
		};
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();
	});
	it('ctrl variables should be with mock data objects and able to catch exeptions', function() {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.reject({});
		$scope.$digest();
	});
	it('ctrl variables should be with mock data objects and employeeBenefitsProgram is undefined or null', function() {
		var response = {
			benefitsSummaryViewPlans : {
				benefitProgramList:[{
					benefitProgram:'Dental'
				}],
				payFrequencyList:['ATN'],
				employeePayFrequency:'ATN',
				employeeBenefitProgram:null
			}
		}
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(response);
		$scope.$digest();
	});
	it('should reorderID',function() {
		spyOn(angular,"forEach");
		var benefitsSummaryNew= {
			id:'01'
		};
		ctrl.reOrderId(benefitsSummaryNew);
	});
	it('should return plans that appliesToYou  ',function() {
		ctrl.payFrquencyListArray = {
			benefitProgramList:[{
				benefitProgram:'Dental'
			}]
		};
		ctrl.employeeBenefitProgram = 'Dental';
       ctrl.employeePayFrequency = 'yes';
		ctrl.appliesToYou('yes',0)

	});
	it('should return plans that appliesToYou elae case  ',function() {
		ctrl.payFrquencyListArray = {
			benefitProgramList:[{
				benefitProgram:'Vision'
			}]
		};
		ctrl.employeeBenefitProgram = 'Dental';
		ctrl.employeePayFrequency = 'yes';
		ctrl.appliesToYou('yes',0)

	});
	it('should open the modal',function() {
		ctrl.openCobraSummaryModal('03-03-2018','05-04-2018');
	});

	it('should open the modal openBuildMaintainCustomModal',function() {
		ctrl.openBuildMaintainCustomModal('03-03-2018','05-04-2018');
	});
});
