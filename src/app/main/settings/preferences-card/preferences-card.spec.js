
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnPreferencesCardController = require('./preferences-card.component');

describe('preferences-card component', function () {

	var ctrl;
	var $scope;
	var DS;
	var $uibModal;
	var gso;
	var prefTypeMap;
	var w2LabelMap;
	var htmlTextMap;
	var utilService;
	var $timeout;
	var deffered;
	var results = {
		companyInfo:[{
			companyId:'',
			companyDesc:'',
			peoId:''
		}],
		preferenceType : 'BETA_PREF'

	}
	var data = {
		"data":"data"
	};
	beforeEach(function () {

		var moduleName = 'app.main.settings.preferences-card';


		var mockDSService = function() {
			return {

			}
		};
		var mock$uibModal = function() {
			return {
				open: function() {
					return {
						modal : {
							result : ""
						}
					}

				}
			};
		};
		var mockgsoService = function() {
			return {
				getUtilService:function(){
					return {
						logout:function(pa) {
							return {};
						},
						getCookie:function(){
							return 'hghgjhg';
						}
					};
				},
				getAppConfig:function(){
					return  {
						userId:function(){
							return '';
						},
						personId :function(){
							return '';
						},
						companyName:function(){
							return '';
						}
					}
				}
			}
		};
		var mockprefTypeMap = function () {
			return {};
		};
		var mockw2LabelMap = function () {
			return {};
		};
		var mockhtmlTextMap = function () {
			return {};
		};
		var mockutilService = function() {
			return {

			};
		};
	/*	var mock$timeout = function () {
			return {};
		};*/

		angular
			.module(moduleName, [])
			.service('DS',mockDSService)
			.service('$uibModal',mock$uibModal)
			.service('gso',mockgsoService)
			.service('prefTypeMap',mockprefTypeMap)
			.service('w2LabelMap',mockw2LabelMap)
			.service('htmlTextMap',mockhtmlTextMap)
			.service('utilService',mockutilService)
	/*		.service('$timeout',mock$timeout)*/
			.component('tnPreferencesCardController', tnPreferencesCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController , _DS_, _$uibModal_,$q, _gso_,
								_prefTypeMap_, _w2LabelMap_, _htmlTextMap_, _utilService_, _$timeout_) {
		$scope = $rootScope.$new();
		DS=_DS_;
		$uibModal=_$uibModal_;
		gso=_gso_;
		prefTypeMap=_prefTypeMap_;
		w2LabelMap=_w2LabelMap_;
		htmlTextMap=_htmlTextMap_;
		utilService=_utilService_;
		$timeout=_$timeout_,
			deffered = $q.defer();

		var locals = {
			$scope: $scope,
			DS:DS,
			$uibModal:$uibModal,
			gso:gso,
			prefTypeMap:prefTypeMap,
			w2LabelMap:w2LabelMap,
			htmlTextMap:htmlTextMap,
			utilService:utilService,
			$timeout:$timeout

		};
		DS.find = jasmine.createSpy('preferences','').and.returnValue(deffered.promise);
		DS.update = jasmine.createSpy('preferences', '', data).and.returnValue(deffered.promise);
		ctrl = $componentController('tnPreferencesCardController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.resolve(results);
		$scope.$digest();
		/*expect(DS.update).toHaveBeenCalled();
		deffered.resolve(results);
		$scope.$digest();*/
	});
	it('ctrl variables should be with mock data objects , catch error if response fails',function(){

		var error = {
			data:[{
				_statusText:'failure'
			}]
		}
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.reject(error);
		$scope.$digest();
	});
	it('should test window open event', inject(function( $timeout ) {
		$timeout.flush();
	}));

	it('should be the Is toggled',function(){
        var type = {};
        var isToggled = {};
		ctrl.onToggle(type,isToggled);
	});
	it('should be the Is toggled',function(){
		var type = {};
		var isToggled = {};
		var html ;
		ctrl.confirm (type,isToggled,html);
	});

	it('should save and success data',function(){
		var type = {};
		var isToggled = {};
		ctrl.save(type,isToggled);
		expect(DS.update).toHaveBeenCalled();
		deffered.resolve(results);
		$scope.$digest();
	});
	it('should save and exception data',function(){
		var type = {};
		var isToggled = {};
		ctrl.save(type,isToggled);
		expect(DS.update).toHaveBeenCalled();
		deffered.reject({ });
		$scope.$digest();
	});
});
