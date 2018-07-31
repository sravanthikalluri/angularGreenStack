'use strict';

var angular = require('angular');
require('angular-mocks');

var tnTitleController = require('./tn-title.component');

describe('tn-title.component component', function() {
	var $scope;
	var ctrl;
	var gso;

	beforeEach(function() {

		var moduleName = 'trinet.shared.components.tn-title';

		var mockgso =  function () {
			return {
				getAppConfig : function () {
					return {
						employmentStatus : " Employee"
					}
				}
			}
		};
		angular
			.module(moduleName, [])
			.service('gso',mockgso)
			.component('tnTitleController', tnTitleController);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope, $componentController,_gso_) {
		var locals;
		gso=_gso_;
		$scope = $rootScope.$new();

		// Set up our dependencies to be injected into $componentController
		locals = {
			$scope: $scope,
			gso:gso
		};

		// Initialize Component Controller
		ctrl = $componentController('tnTitleController', locals, null);
	}));
	it('should initailise the component',function() {
		ctrl.$onInit();
	});
});


