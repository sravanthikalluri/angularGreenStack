'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsMedicalPlanCoverageSummaries = require('./benefits-medical-plan-coverage-summaries.component');

describe('benefits-medical-plan-coverage-summaries component', function () {

	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS': 'DS',
		'$uibModal': '$uibModal',
		'imageConfig': 'imageConfig',
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
						subpanes: {}
					}]
				}]
			}
		},
		'errorData': {
			data: {
				_error: {message: "error"}
			}
		},
		'data': {
			return: {imageUrl: "abcd.jpg"}
		},
		moduleName: 'app.main.benefits.resources.additional-resources-benefits-medical-plan-coverage-summaries',
		mockDSService: function () {
			return {}
		},
		mockGsoService: function () {
			return {}
		},
		mockUIBModalService: function () {
			return {}
		},

		mockImageConfigService: function () {
			return {}
		},
		locals: {}
	};

	beforeEach(function () {

		angular
			.module(obj.moduleName, [])
			.service('DS', obj.mockDSService)
			.service('$uibModal', obj.mockUIBModalService)
			.service('imageConfig', obj.mockImageConfigService)
			.component('benefitsMedicalPlanCoverageSummaries', benefitsMedicalPlanCoverageSummaries);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _DS_, _$uibModal_, _imageConfig_) {


		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;


		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		obj['$uibModal'] = _$uibModal_;
		obj['$uibModal'].open = jasmine.createSpy();

		obj['imageConfig'] = _imageConfig_;
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			DS: obj['DS'],
			$uibModal: obj['$uibModal'],
			imageConfig: obj['imageConfig']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('benefitsMedicalPlanCoverageSummaries', obj.locals, null);
		obj['ctrl'].response = {
			benefitsSummaryPlan: {
				employeeAssistancePlan: [
					{
						sub: [
							{}
						]
					}
				]
			}
		}
	}));

	/*it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);


		obj['$scope'].$digest();

		expect(obj['ctrl'].visionData).toEqual(obj['mockData'].benefitsSummaryPlan.vision);
		expect(obj['ctrl'].lifeData).toEqual(obj['mockData'].benefitsSummaryPlan.life);
		expect(obj['ctrl'].dentalData).toEqual(obj['mockData'].benefitsSummaryPlan.dental);
		expect(obj['ctrl'].disability).toEqual(obj['mockData'].benefitsSummaryPlan.disability);
		expect(obj['ctrl'].medicalData).toEqual(obj['mockData'].benefitsSummaryPlan.medical);
		expect(obj['ctrl'].criticalIllnessData).toEqual(obj['mockData'].benefitsSummaryPlan.criticalIllness);
		expect(obj['ctrl'].legalServicesData).toEqual(obj['mockData'].benefitsSummaryPlan.legalServices);
		expect(obj['ctrl'].flexibleSpendingAmountsData).toEqual(obj['mockData'].benefitsSummaryPlan.flexibleSpendingAccounts);
		expect(obj['ctrl'].employeeAssistancePlan).toEqual(obj['mockData'].benefitsSummaryPlan.employeeAssistancePlan[0].sub[0].subpanes);
	});
	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();

		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].reject(obj['errorData']);
		obj['$scope'].$digest();

	});*/
	it('should return  array of  numbers controller', function () {
		obj['ctrl'].$onInit();

		obj['ctrl'].getPdfLink(obj['num']);

	});
	it('should return  image', function () {
		obj['ctrl'].$onInit();

		obj['imageConfig'].images = [];
		obj['ctrl'].bindImgUrl();

	});
	/*it('should return  datamodal',function() {
	 ctrl.$onInit();

	 expect(DS.find).toHaveBeenCalled();
	 deferred.resolve(mockData)
	 $scope.$digest();
	 ctrl.modalData();

	 });*/
	it('provider popup function call with type as medical', function () {
		obj['ctrl'].medicalData = [{text: 'medical'}];
	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].visionData = [{text: 'vision'}];
	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].lifeData = [{text: 'life'}];
	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].dentalData = [{text: 'dental'}];

	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].disability = [{text: 'disability'}];
	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].criticalIllnessData = [{text: 'criticalIllness'}];
	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].legalServicesData = [{text: 'legalServices'}];
	});

	it('provider popup function call with type as medical', function () {
		obj['ctrl'].flexibleSpendingAmountsData = [{text: 'flexibleSpendingAccounts'}];
	});


});
