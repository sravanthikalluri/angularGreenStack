
'use strict';

var angular = require('angular');
require('angular-mocks');

var tnProfileEmergency = require('./tn-profile-emergency.component');

describe('tn-profile-emergency component', function (){
	var $scope,ctrl,$state;
	beforeEach(function() {
		var mock$stateService=function(){
			return {
				go: function () {

				}
			}
		};
		var moduleName = 'trinet.shared.components.tn-profile-emergency';


		angular
			.module(moduleName, [])
			.service('$state',mock$stateService)
			.component('tnProfileEmergency', tnProfileEmergency);

		angular.mock.module(moduleName);
	});


	beforeEach(inject(function($rootScope, $componentController,_$state_){
		$scope = $rootScope.$new();
		$state=_$state_;
		var locals = {
			$scope: $scope,
			$state:$state
		};
		ctrl = $componentController('tnProfileEmergency', locals ,null);
	}));

	/*ctrl.tootleLink(index,data);*/
	it('should go to edit-profile emergencypage',function() {
		ctrl.edit();
	});

});

