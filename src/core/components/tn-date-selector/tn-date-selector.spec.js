'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var tnDateSelectorController = require('./tn-date-selector.component');

describe('tn-date-selector component', function () {
	var ctrl;
	var $scope;
	var utilService;
	var $filter;
	var deffered;
	var results = {
		companyInfo:[{
			companyId:'',
			companyDesc:'',
			peoId:''
		}]
	}
	beforeEach(function () {

		var moduleName = 'trinet.core.components.tn-date-selector';

		var mockutilService = function() {
			return {

			};
		};
		var mock$filter = function() {
			return {}
		};

		var mockmoment = function () {
			return {}
		}
		angular
			.module(moduleName, [])
			.service('utilService',mockutilService)
			.service('$filter',mock$filter)
			.service('moment',mockmoment)

			.component('tnDateSelectorController', tnDateSelectorController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController, _utilService_,_$filter_,_moment_,$q) {
		$scope = $rootScope.$new();
		utilService = _utilService_;
		$filter=_$filter_;
		moment=_moment_;
		deffered = $q.defer();

		var locals = {
			$scope: $scope,
			utilService:utilService,
			$filter:$filter,
			moment:moment,
		};
		ctrl = $componentController('tnDateSelectorController', locals, null);
	}));
	it('ctrl variables should be with mock data objects',function(){
		ctrl.$onInit ;
	});
	it('update function', function () {
		ctrl.onUpdate = function () {}
		ctrl.update("");
	});

	/*	it('should be the get the next date',function(){
            ctrl.next();
        });
        it('should be the get the next date',function(){
            ctrl.prev();
        });*/
/*	it('ctrl variables should be with mock data objects , catch error if response fails',function(){
		ctrl.$onInit();
		expect(DS.find).toHaveBeenCalled();
		deffered.reject({});
		$scope.$digest();
	});
	it('should set ContentBackground',function(){
		$scope.setContentBackground();
	})*/
});





/*
'use strict';

var angular = require('angular');
require('angular-mocks');
var moment = require('moment');
var tnDateSelector = require('./tn-date-selector.component');

describe('tn-date-selector component', function (){
	var obj={
		'$componentController':'$componentController',
		'ctrl':'ctrl',
		'$scope':'$scope',
		'moment':'moment',
		'$filter':'$filter',
		'utilService':'utilService',
		moduleName : 'trinet.core.components.tn-date-selector',
		mock$filter : function () {
			return {

				}
			},
		mockUtilService: function () {
			return {

			}
		},
		mockMomentService : function() {
			return function (dateString) {
				return moment(dateString);
			}
		},

		locals:{}

	}

	beforeEach(function() {
		angular
			.module(obj.moduleName, [])
			.service('utilService', obj.mockUtilService)
			.service('$filter',obj.mock$filter)
			.service('moment',obj.mockMomentService)
			.component('tnDateSelector', tnDateSelector);

		angular.mock.module(obj.moduleName);
	});


	beforeEach(inject(function($rootScope, $q, _$componentController_, _moment_,_utilService_,$filter){
		obj['$scope'] = $rootScope.$new();
		obj['$componentController'] = _$componentController_;
		obj['utilService'] = _utilService_;
		obj['moment'] = _moment_;
		obj['$filter'] =$filter;
		obj.locals = {
			$scope: obj['$scope'],
			moment:obj['moment'],
			utilService: obj['utilService'],
			$filter:obj['$filter'],
		};

		obj['ctrl'] = obj['$componentController']('tnDateSelector', obj.locals ,null);
	}));

	it('oninit function', function($compile) {
		var ele = '<button id="prev">Click</button>';
		$compile(ele);
		obj['$scope'].$digest();
		obj['ctrl'].$onInit();

	});


});
*/
