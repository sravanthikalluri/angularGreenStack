'use strict';

var angular = require('angular');
require('angular-mocks');

var eformsAcknowledgement = require('./eforms-acknowledgement.component');

describe('eforms-acknowledgement component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var $sce;
	var gso;
	var GetAcrobatInfoService;
	var stringUtil;
	var timeout;
	var deferred;
	var $filter;
	var $uibModal;
	var mockData = {
		policiesDetails: {

		},
		eforms_data: []
	};


	beforeEach(function() {
		var moduleName = 'app.main.company.eforms-acknowledgement';

		var mock$timeoutService = function(){ };
		var mockGsoService = function(){ return {
			getAppConfig: function () {
				return {
					peoId: 'AMB'
				}
			}

		}};
		var mockDSService = function(){ return {}};
		var mockstringUtilService = function(){ return {}};
		var mock$sceService = function(){ return {
			trustAsResourceUrl: function () {
				return {};
			}
		}};
		var mock$filter = function () {

		};
		var mockGetAcrobatInfoServiceService = function(){ return {
			getBrowserName: function () {
				return 'ie';
			},
			isAcrobatInstalled: function () {
				return false;
			}
		}};

		angular
			.module(moduleName, [])
			.service('$timeout', mock$timeoutService)
			.service('gso', mockGsoService)
			.service('$sce', mock$sceService)
			.service('DS', mockDSService)
			.service('$filter', mock$filter)
			.service('GetAcrobatInfoService', mockGetAcrobatInfoServiceService)
			.service('stringUtil', mockstringUtilService)
			.component('eformsAcknowledgement', eformsAcknowledgement);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _$timeout_,_$filter_, _DS_, _gso_, _$sce_, stringUtil, GetAcrobatInfoService){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;
		$sce = _$sce_;
		$filter=_$filter_;
		stringUtil = stringUtil;
		gso = _gso_;
		timeout = _$timeout_;
		GetAcrobatInfoService = GetAcrobatInfoService;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.create = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			$timeout: timeout,
			gso: gso,
			DS: DS,
			$filter:$filter,
			$sce:$sce,
			GetAcrobatInfoService:GetAcrobatInfoService,
		};

		ctrl = $componentController('eformsAcknowledgement', locals ,null);
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});
	it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		var error=
			{
				data : {
					_error : "Errror Message"
				}
			}
		deferred.reject(error);
		$scope.$digest();
	});

	it('getPolicyUrl function test with formId as 1522', function () {
		ctrl.getPolicyUrl('', '1522');
	});

	it('getPolicyUrl function test with formId as 1', function () {
		ctrl.getPolicyUrl('', '1');
	});

	/*it('Should toggel Form View', function(){
		var index=2;
		ctrl.eformsData = [{
			formId : "",
			isOpen:"true"
		}];
		ctrl.toggleFormView(0);
	});*/

	/*it('Should translateText ', function(){
		var translationProperty='';
		ctrl.translateText(translationProperty);
	});*/

/*	it('Should format Confirmation Message', function(){
		var translationProperty='';
		var textToAdd = "trinet";
		var formId = '1015';
		ctrl.formatConfirmationMessage(translationProperty,textToAdd,formId);
	});*/

	/*it('acknowledge function test ', function () {
		var index=2;
		ctrl.eformsData = [{
			formId : ""
		}];
		ctrl.acknowledge(0);
		expect(DS.create).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});*/
	it('acknowledge function test and exception handling ', function () {
		var index=2;
		ctrl.eformsData = [{
			formId : ""
		}];

		ctrl.acknowledge(0);
		expect(DS.create).toHaveBeenCalled();
		var error=
			{
				data : {
					_error : "Errror Message"
				}
			}
		deferred.reject(error);
		$scope.$digest();
	});
});

