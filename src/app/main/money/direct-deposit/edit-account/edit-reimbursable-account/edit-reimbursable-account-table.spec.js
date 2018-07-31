'use strict';

var angular = require('angular');
var moment=require('moment');
require('angular-mocks');

var tnEditReimbursableAccountTable = require('./edit-reimbursable-account-table.component');

describe('edit-reimbursable-account-table component', function () {

	var ctrl;
	var $scope;
	var utilService;
	var results = {

	};

	beforeEach(function () {
		var moduleName = 'app.main.edit-reimbursable-account-table';
		var mockUtilService = function () {
			return {}
		};
		var mockgsoService = function () {
			return {
				getAppConfig: function () {
					return {
						companyId: 'AMBS'
					}
				}
			}
		};
		angular
			.module(moduleName, [])

			.service('utilService',mockUtilService)
			.service('gso', mockgsoService)

			.component('tnEditReimbursableAccountTable', tnEditReimbursableAccountTable);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, $componentController,_utilService_) {
		$scope = $rootScope.$new();
		utilService=_utilService_;


		utilService.mockAccount=jasmine.createSpy().and.returnValue('');



		var locals = {
			$scope: $scope,
			utilService:utilService,
		};

		ctrl = $componentController('tnEditReimbursableAccountTable', locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		ctrl.data=[{

				"fsaAccount":true,
				"apAccount":true

		}];
		ctrl.$onInit();
	});
	it('should select FSAAccount',function() {
		ctrl.data=[{

				"fsaAccount":true,
				"apAccount":true,

			"key":"0"
		}];
		ctrl.selectFSAAccount(ctrl.data);
	});

	it('should select FSAAccount if true',function() {
		ctrl.data=[{

				"fsaAccount":true,
				"apAccount":true,

			"key":"0"
		}];
		ctrl.selectAPAccount(ctrl.data);
	});

});
