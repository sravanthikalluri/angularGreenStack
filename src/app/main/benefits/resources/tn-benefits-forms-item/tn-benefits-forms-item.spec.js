'use strict';

var angular = require('angular');
require('angular-mocks');

var tnBenefitsFormsItem = require('./tn-benefits-forms-item.component');

describe('tn-benefits-forms-item component', function () {
	var deferred;
	var obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'imageConfig': 'imageConfig',
		moduleName: 'app.main.benefits.resources.tn-benefits-forms-item',
		mockImageConfigService: function () {
			return {
				images: []
			}
		},
		mockCarrierUrlConfigService: function () {
			return {
				url: []
			};
		},
		mockDSService: function () {
			return {};
		},
		locals: {}
	};

	beforeEach(function () {

		angular
			.module(obj.moduleName, [])
			.service('imageConfig', obj.mockImageConfigService)
			.service('carrierUrlConfig', obj.mockCarrierUrlConfigService)
			.service('DS', obj.mockDSService)
			.component('tnBenefitsFormsItem', tnBenefitsFormsItem);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function ($rootScope, _$componentController_, $q, _imageConfig_, _carrierUrlConfig_, _DS_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		deferred = $q.defer();
		obj['imageConfig'] = _imageConfig_;
		obj['carrierUrlConfig'] = _carrierUrlConfig_;
		obj['DS'] = _DS_;
		obj['DS'].find = jasmine.createSpy().and.returnValue(deferred.promise);
		obj.locals = {
			$scope: obj['$scope'],
			imageConfig: obj['imageConfig']
		};

		obj['ctrl'] = obj['$componentController']('tnBenefitsFormsItem', obj.locals, null);
	}));

	it('bindImgUrl function call', function () {
		obj['ctrl'].bindImgUrl();
	});

	it('bindUrl  function call', function () {
		obj['ctrl'].bindUrl();
	});

	it('setResourceItem  function call', function () {
		obj['ctrl'].setResourceItem(0);
	});

	it('closeAll  function call', function () {
		obj['ctrl'].closeAll();
	});

	it('toggleCarriersList  function call', function () {
		obj['ctrl'].toggleCarriersList(0);
	});
});
