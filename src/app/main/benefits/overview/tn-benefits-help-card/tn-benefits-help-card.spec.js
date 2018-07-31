'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitsHelpCard = require('./tn-benefits-help-card.component');

describe('tn-benefits-help-card component', function () {


	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'url': 'url',
		'gso': 'gso',
		'$state': '$state',
		'urlLink': 'urlLink',
		'BenefitsGuidebookService': 'BenefitsGuidebookService',
		'deferred': 'deferred',
		'mockData': {
			guideInfo: {
				"canadian": false,
				"guideBookDesc": [
					{
						"date": "(January   01, 2017 - December  31, 2017)",
						"url": "/v1/extranet/Benefits/benefit_guide/Trinet-Benefit-Guidebook_Cur_Q1.pdf",
						"text": "TriNet Benefits Guidebook and Summary Plan Description"
					},

				],
			}
		},
		moduleName: 'app.main.benefits.overview.tn-benefits-help-card',


		mockBenefitsGuidebookService: function () {
			return {}
		},
		mockGSOService: function () {
			return {
				getAppConfig: function () {
					return {};
				}
			};
		},
		mock$stateService: function () {
			return {
				go: function () {
					return {};
				}
			};
		},
		locals: {}
	};


	beforeEach(function () {


		angular
			.module(obj.moduleName, [])

			.service('BenefitsGuidebookService', obj.mockBenefitsGuidebookService)
			.service('gso', obj.mockGSOService)
			.service('$state', obj.mock$stateService)

			.component('tnBenefitsHelpCard', tnBenefitsHelpCard);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, $q, _$componentController_, _BenefitsGuidebookService_, _gso_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['BenefitsGuidebookService'] = _BenefitsGuidebookService_;
		obj['BenefitsGuidebookService'] = _BenefitsGuidebookService_;
		obj['gso'] = _gso_;
		obj['deferred'] = $q.defer();
		obj['BenefitsGuidebookService'].find = jasmine.createSpy().and.returnValue(obj.deferred.promise);
		/*$BenefitsGuidebookService.find = jasmine.createSpy().and.returnValue('');*/
		obj.locals = {
			$scope: obj['$scope'],
			BenefitsGuidebookService: obj['BenefitsGuidebookService']


		};

		obj['ctrl'] = obj['$componentController']('tnBenefitsHelpCard', obj.locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		obj['ctrl'].$onInit();
		expect(obj['BenefitsGuidebookService'].find).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();

	});

	obj['url'] = obj['mockData'].url;
	it('should test window open event', inject(function ($window) {
		spyOn($window, 'open').and.callFake(function () {
			return true;
		});
		obj['ctrl'].openPdf(obj['url']);
		expect($window.open).toHaveBeenCalled();
		obj['urlLink'] = "/api-content" + obj['url'];
		expect($window.open).toHaveBeenCalledWith(obj['urlLink'], '_blank');
	}));

	it('should redirectToResource', function(){
		var value = "";
		obj['ctrl'].redirectToResource(value);
	});
});

