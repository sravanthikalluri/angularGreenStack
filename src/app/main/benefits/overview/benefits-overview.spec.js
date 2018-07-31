'use strict';

var angular = require('angular');
require('angular-mocks');

var benefitsOverview = require('./benefits-overview.component');

describe('benefit overview component', function (){
	var $componentController;
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var timeout;
	var deferred;
	var $uibModal;
	var mockData = {
		benefits: [
			{
				planType: 'planTypeDecriptionValue',
				planInfo: { providerName: 'UHC'},

			},
			{
				planType: '10',
				planInfo: {}
			},
			{
				planType: 'A4',
				planInfo: {}
			}
		],
		enrollmentDeadline: {}
	};


	beforeEach(function() {
		var moduleName = 'app.main.benefits.overview';
		var mockGsoService = function(){ return {
			getAppConfig: function () {
				return {
					peoId: 'AMB',
					companyId: '001'
				}
			},
			getUtilService: function () {
				return {
					filterCurrentDate: function () {
						return {};
					},
					todayBtnTwoDates: function () {
						return {};
					}
				};
			},


		}};
		var mockDSService = function(){ return {}};
		var mock$uibModalService = function(){ return {
			open: function () {
				return {};
			}
		}};

		angular
			.module(moduleName, [])
			.service('gso', mockGsoService)
			.service('DS', mockDSService)
			.service('$uibModal', mock$uibModalService)
			.component('benefitsOverview', benefitsOverview);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, $q, _DS_, _gso_, _$uibModal_){
		$scope = $rootScope.$new();
		$componentController = _$componentController_;
		DS = _DS_;

		deferred = $q.defer();
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		gso = _gso_;
		$uibModal = _$uibModal_;

		var locals = {
			$scope: $scope,
			gso: gso,
			DS: DS,
			$uibModal: $uibModal
		};

		ctrl = $componentController('benefitsOverview', locals ,null);
	}));

	it('$onInit function test ', function () {
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deferred.resolve(mockData);
		$scope.$digest();
	});

	it('popUp function test ' , function () {
		ctrl.popUp();
	});

});

