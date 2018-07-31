'use strict';

var angular = require('angular');
require('angular-mocks');

var tnNoticeEventBaseController = require('./notices-event-base-card.component');

describe('notices-event-base-card component', function (){
	var obj={
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'DS':'DS',
		'gso':'gso',
		'SharedDataService':'SharedDataService',

		moduleName: 'app.shared.components.tn-notices-event-base',
		mockGSOService: function () {
			return {
				getAppConfig: function () {
					return {};
				}
			}
		},
		mockDSService: function () {
			return {};
		},
		mockSharedDataService : function () {
		return{
			getAppSharedData : function(){
				return {
					hrpUrl : "/bib"
				}
			}
		}
		},

		mockData: {
			planCarriersCtrldocMeta: [
				{
					title: 'Summary of Medical Plan Changes'
				}
			],
			planCarriersCtrlGeneral: []
		},
		locals: {}
	};



	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('gso', obj['mockGSOService'])
			.service('DS', obj['mockDSService'])
			.service('SharedDataService', obj['mockSharedDataService'])
			.component('tnNoticeEventBaseController', tnNoticeEventBaseController);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, _$componentController_, _DS_,_SharedDataService_,_gso_, $q){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['DS'] = _DS_;
		obj['SharedDataService']=_SharedDataService_;
		obj['gso'] = _gso_;

		obj.locals = {
			$scope: obj['$scope'],

		};
		obj['deferred'] = $q.defer();
		obj['DS'].find = jasmine.createSpy('notices-event','').and.returnValue(obj['deferred'].promise);
		obj['DS'].get = jasmine.createSpy('microservices-config','0').and.returnValue(obj['deferred'].promise);
		obj['ctrl'] = obj['$componentController']('tnNoticeEventBaseController', obj.locals ,null);
	}));


	it('ctrl variables should be with mock data objects', function() {
		var results = {
			res:[{
				noticeId:'CBR_01'
			},{
				noticeId:'ALE_02'
			},{
				noticeId:'BNH_01'
			},
				{
					noticeId:'BNH_02'
				},
				{
					noticeId:'BNH_03'
				},
				{
					noticeId:'BNH_10'
				},
				{
					noticeId:'BNH_11'
				},{
					noticeId:''
				}]
		}
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].resolve(results);
		obj['$scope'].$digest();
	});
	it('ctrl variables should be with mock data objects', function() {
		var results = {
			res:[{
				noticeId:'CBR_01'
			},{
				noticeId:'ALE_02'
			},{
				noticeId:'BNH_01'
			},
				{
					noticeId:'BNH_02'
				},
				{
					noticeId:'BNH_03'
				},
				{
					noticeId:'BNH_10'
				},
				{
					noticeId:'BNH_11'
				},{
					noticeId:''
				}]
		}
		obj['ctrl'].$onInit();
		expect(obj['DS'].find).toHaveBeenCalled();
		obj['deferred'].reject({});
		obj['$scope'].$digest();
	});

});
