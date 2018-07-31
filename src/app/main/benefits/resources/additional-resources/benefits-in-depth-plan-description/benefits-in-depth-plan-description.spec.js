'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsInDepthPlanDescription = require('./benefits-in-depth-plan-description.component');

describe('benefits-in-depth-plan-description component', function (){

	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'gso': 'gso',
		'deferred': 'deferred',
		'num':'num',
		'$uibModal':'$uibModal',
		'imageConfig':'imageConfig',
		'type':'type',
		'index':'index',
		'sbc':'sbc',
		'mockData': {
			benefitsSummaryPlan: {
				vision: {},
				life: {},
				dental: {},
				disability: {},
				medical: [],
				criticalIllness: {},
				legalServices: {},
				flexibleSpendingAccounts: {},
				employeeAssistancePlan: [{
					sub: [{
						subpanes:{}
					}]
				}]
			}
		},
		'errorData':{
			data:{
				_error: {message:"error"}
			}
		},
		'data':{
			return:{imageUrl:"abcd.jpg"}
		},
		moduleName:'app.main.benefits.resources.additional-resources-benefits-in-depth-plan-description',
		mockDSService: function () {
			return {}
		},
		mockGsoService: function () {
			return {}
		},
		mockUIBModalService : function()
		{
			return {
				resolve : {
				modalData : function () {

				},
				modalObject : function () {

				}
			}
			}
		},

		mockImageConfigService:function()
		{
			return {
				images : [{
					data : " "
				}]
			}
		},
		locals: {}
	};

	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('gso', obj.mockGsoService)
			.service('DS', obj.mockDSService)
			.service('$uibModal', obj.mockUIBModalService)
			.service('imageConfig', obj.mockImageConfigService)
			.component('benefitsInDepthPlanDescription', benefitsInDepthPlanDescription);

		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_, _$uibModal_, _imageConfig_){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['gso'] = _gso_;
		obj['gso'].getAppConfig = jasmine.createSpy().and.returnValue('');
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['$uibModal'] = _$uibModal_;
		obj['$uibModal'].open = jasmine.createSpy();
		obj['imageConfig'] = _imageConfig_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			gso: obj['gso'],
			$uibModal:obj['$uibModal'],
			imageConfig: obj['imageConfig']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('benefitsInDepthPlanDescription', obj.locals,
			{
				response:{
				    benefitsSummaryPlan: {employeeAssistancePlan : [{sub : [{ subpanes : " "}] }]},
					modalObject: {sbcValue : ""}
				},
				modalInstance:{
					dismiss:function(cancel) {
						return {};
					},
					close:function(cancel) {
						return {};
					}
				},
			});
	}));

	it('should component initailization', function () {
		obj['ctrl'].$onInit();
		var num=" ";
		obj['ctrl'].getPdfLink(num);
	});

	it('should openModal', function () {
		var data = "modal ",dataForModal= " modal data";
		obj['ctrl'].openModal(data,dataForModal);
	});
	it('should bindImgUrl', function () {
		var data = { };
		obj['ctrl'].bindImgUrl(data);
	});
	it('atena PopUp function call with type as medical',function(){
		obj['ctrl'].medicalData = [{text:'medical'}];
		var type = "medical";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('atena PopUp function call with type as vision',function(){
		obj['ctrl'].visionData = [{text:'vision'}];
		var type = "vision";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('atena PopUp function call with type as lifedata',function(){
		obj['ctrl'].lifeData = [{text:'life'}];
		var type = "life";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('atena PopUp function call with type as dentaldata',function(){
		obj['ctrl'].dentalData = [{text:'dental'}];
		var type = "dental";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('atena PopUp function call with type as medical',function(){
		obj['ctrl'].disability = [{text:'disability'}];
		var type = "disability";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('atena PopUp function call with type as medical',function(){
		obj['ctrl'].criticalIllnessData = [{text:'criticalIllness'}];
		var type = "criticalIllness";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('atena PopUp function call with type as medical',function(){
		obj['ctrl'].legalServicesData = [{text:'legalServices'}];
		var type = "legalServices";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});

	it('provider popup function call with type as medical',function(){
		obj['ctrl'].flexibleSpendingAmountsData = [{text:'flexibleSpendingAccounts'}];
		var type = "flexibleSpendingAccounts";
		var index = 0;
		var sbc = "sbc";
		obj['ctrl'].atenaPopUp(index,type,sbc);
	});


});
