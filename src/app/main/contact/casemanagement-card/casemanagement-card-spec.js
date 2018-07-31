
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnCaseManagementCardController = require('./casemanagement-card.component');

describe('casemanagement-card.component', function () {
	var ctrl;
	var $scope;
	var DS;
	var gso;
	var deferred;
	beforeEach(function () {

		var moduleName = 'app.main.contact.casemanagement-card';


		var mockDSService = function () {

		};

		var mockgso = function () {
          return {
			  getAppConfig : function () {
			return {
				  	  pfClient  : "",
					  peoId : ""
			  }
			  }
		  }
		};
		angular
			.module(moduleName, [])
			.service('gso',mockgso)
			.service('DS',mockDSService)
			.component('tnCaseManagementCardController', tnCaseManagementCardController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_gso_,_DS_,$q) {
		$scope = $rootScope.$new();
		gso=_gso_;
		DS=_DS_;
		deferred = $q.defer();

		DS.find=jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS:DS,
			gso:gso,
		};

		ctrl = $componentController('tnCaseManagementCardController', locals, null);
	}));

	it('ctrl variables should be with mock data objects',function(){
		var val="";
		ctrl.getUrl(val);
	});

});
