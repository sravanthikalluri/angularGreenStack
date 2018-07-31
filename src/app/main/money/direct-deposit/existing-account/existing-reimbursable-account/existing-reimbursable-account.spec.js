'use strict';

var angular = require('angular');
require('angular-mocks');

var tnExistingReimbursableAccount = require('./existing-reimbursable-account.component');

describe('existing-reimbursable-account component', function () {

	var ctrl;
	var $scope;
	var utilService;

	beforeEach(function () {
		var moduleName = 'app.main.company.existing-reimbursable-account';

		var mockUtilService = function () {
			return {}
		};
		var mockgsoService = function () {
			return {
				getAppConfig: function () {
					return {
						companyId: 'ABC'
					}
				}
			}
		};
		angular
			.module(moduleName, [])
			.service('utilService',mockUtilService)
			.service('gso', mockgsoService)
			.component('tnExistingReimbursableAccount', tnExistingReimbursableAccount);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function ($rootScope, $componentController, $q,_utilService_) {
		$scope = $rootScope.$new();
		utilService=_utilService_;
		utilService.mockAccount=jasmine.createSpy().and.returnValue('');
		var locals = {
			$scope: $scope,
			utilService:utilService,
		};

		ctrl = $componentController('tnExistingReimbursableAccount', locals, null);
	}));

	it('ctrl variables should be with mock data objects', function () {
		ctrl.data=[{
			"fsaAccount":true,
			"apAccount":true
		}];
		ctrl.$onInit();
	});
	it('should allow changes to make in modal',function() {
		ctrl.$onChanges();
	});
});
