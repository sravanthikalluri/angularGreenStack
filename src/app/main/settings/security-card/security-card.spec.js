
'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var securityCard = require('./security-card.component');

describe('security-card component', function () {
	var obj;
	obj = {
		'$componentController': '$componentController',
		'ctrl': 'ctrl',
		'$scope': '$scope',
		'deferred': 'deferred',
		'$uibModal': '$uibModal',
		'security' : 'security',
		'securityModalConfig':'securityModalConfig',
		'$filter':'$filter',
		'$window':'$window',
		'mockData': {
			data: {
				"secretQuestion":[

				]
			}
		},
		moduleName: 'app.main.settings.security-card',
		mockUIBModalService : function(){ return {}},
		securityMockService:function () {return{}},
		securityModalConfigMock:function () {return{}},
		$filterMock:function () {return{}},
		$windowMock : function () {
			return {
				sessionStorage : {
					getItem : function (personId) {
						return {

						}

					}
		         }
			}
		},
		momentService:function(){
			return function(dateString) {
				return moment(dateString).fromNow();
			};
		},
		locals: {}
	};

	beforeEach(function () {
		angular
			.module(obj.moduleName, [])
			.service('moment',obj.momentService)
			.service('security',obj.securityMockService)
			.service('$uibModal',obj. mockUIBModalService)
			.service('$window',obj. $windowMock)
			.service('securityModalConfig',obj.securityModalConfigMock)
			.service('$filter',obj.$filterMock)
			.component('securityCard', securityCard);


		angular.mock.module(obj.moduleName);
	});

	beforeEach(inject(function ($rootScope, _$componentController_, $q,_$uibModal_,_security_,_securityModalConfig_,_$window_,_$filter_) {
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['deferred'] = $q.defer();
		obj['$uibModal'] = _$uibModal_;
		obj['security'] = _security_;
		obj['$window'] =_$window_;
		obj['securityModalConfig']  = _securityModalConfig_;
		obj['$filter'] = _$filter_;

		//creating spy for promises
		obj['security'].fetch = jasmine.createSpy().and.returnValue(obj['deferred'].promise);
		// Set up our dependencies to be injected into $componentController
		obj.locals = {
			$scope: obj['$scope'],
			moment:moment,
			security:obj['security'],
			$uibModal:obj['$uibModal'],
			securityModalConfig:obj['securityModalConfig'],
			$filter:obj['$filter'],
			$window:obj['$window']
		};

		// Initialize Component Controller
		obj['ctrl'] = obj['$componentController']('securityCard', obj.locals, null);
	}));

	it('ctrl variables should be initialized ', function () {
		obj['ctrl'].$onInit();
	});
/*	it('should call the security fetch spy',function () {
		obj['ctrl'].$onInit();
		expect(obj['security'].fetch).toHaveBeenCalled();
		obj['deferred'].resolve(obj['mockData']);
		obj['$scope'].$digest();
	});*/


	it('should call the security fetch spy reject',function () {
		obj['ctrl'].$onInit();
	});

	it('should call the initItems of ctrl',function () {
		var data = {
			"secretQuestion":{
				"push":{
					"question":''
				}
			}


		}

	});

/*	it('ctrl variables should be initialized ', function () {
		var item="item";
/!*
		ctrl.resolve= {
			"data":[
				{
					"message":"modal data message"
				}
			]
		};*!/
		obj['ctrl'].prompt(item);
/!*
		var config={
			"template":{}
		}*!/
	});*/
});
