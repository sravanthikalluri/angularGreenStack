'use strict';

var angular = require('angular');
var moment = require('moment');
require('angular-mocks');

var tnHomeAddressSectionController = require('./home-address-section.component');

describe('home-address-section component', function () {
	var ctrl;
	var $scope;
	var constants;
	var deffered;
	var $uibModal;

	beforeEach(function () {
		var moduleName = 'app.main.edit-profile.edit-profile-personal.home-address-section';

		var mockmoment = function() {
			return {

			}
		};
		var mock$uibModal = function () {
			return {
				open : function () {

				}
			}

		};
		var mockconstants = function() {
			return {

			}
		};

		angular
			.module(moduleName, [])
		    .service('moment',mockmoment)
			.service('constants',mockconstants)
			.service('$uibModal',mock$uibModal)
			.component('tnHomeAddressSectionController', tnHomeAddressSectionController);
		angular.mock.module(moduleName);
	});

	beforeEach(inject(function ($rootScope, $componentController,_moment_, _constants_,$q,_$uibModal_) {
		$scope = $rootScope.$new();
		moment=_moment_;
		constants=_constants_;
		$uibModal=_$uibModal_;
		deffered = $q.defer();
		var locals = {
			$scope: $scope,
			moment:moment,
			constants:constants,
			$uibModal:$uibModal
		};


		ctrl = $componentController('tnHomeAddressSectionController', locals, {
			prompt : function () {

			},
			data : {deletedAddresses : " ",
					address :  [{
						effectiveDate : " 20/03/2018",
						country : "US"
					}]
			},
			dateMenuObject : {
				indexOf: function () {

				}
			}
		});
	}));
	it('should controller initailisation',function () {
		ctrl.$onInit();
	});
	it('update function', function () {
		var prop="effectiveDate";
		var value = "";
		ctrl.onUpdate = function() {
		};
		ctrl.update(prop, value);
	});

	it('should changeAddressInfoDate', function(){
		var selectedEffectiveDate = "Currently Effective";
		var address="US";
		ctrl.changeAddressInfoDate(selectedEffectiveDate,address);
	});
     it('should deleteAddress ', function(){
     	var addressListCopy = {
			address : [{

			}]
		};
		 var selectedEffectiveDate = "Currently Effective";
		 var addressInfo=" ";
		 ctrl.deleteAddress(addressInfo,selectedEffectiveDate);
	 });
});
