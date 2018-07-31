/*
/!**!/'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var taxWithholdingService = require('./tax-withholdings.service');

describe('Tax-withholding-Service component', function() {

	var ctrl;
	var $scope;
	var DS;
	var deferred;
	var $state;
	var results = {

	};

	beforeEach(function () {
		var moduleName = 'app.main.company.edit-account';


		var mockDSService = function () {
			return {}
		};
		var mock$state = function () {
			return {
				go: function () {

				}
			}
		};
		angular
			.module(moduleName, [])
			.service('DS', mockDSService)
			.service('$state', mock$state)
			.component('tnEditAccount', tnEditAccount);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($q, DS_) {
		$scope = $rootScope.$new();
		DS = _DS_;


		var stateParams = { data: 1 };
		$state = _$state_;
		deferred = $q.defer();
		DS.create = jasmine.createSpy().and.returnValue(deferred.promise);
		DS.find = jasmine.createSpy().and.returnValue(deferred.promise);

		var locals = {
			$scope: $scope,
			DS: DS,
			$state:$state,
		};

		ctrl = $componentController('tnEditAccount', locals, null);
	}));

	it('should create tax with holding',function() {

		me._create();
	});



	it('should create tax with holding',function() {

		me._getW2Information
	});

/!*	it('should fetch the controller',inject(function(taxWithholdingEffectiveDateService){
		var toDate = '02/02/2018';
		taxWithholdingEffectiveDateService.getNext(toDate);

	}));
	it('should fetch the controller and give Nect date',inject(function(taxWithholdingEffectiveDateService){
		var toDate = '03/24/2018';
		taxWithholdingEffectiveDateService.getNext(toDate);

	}));*!/
});
*/
