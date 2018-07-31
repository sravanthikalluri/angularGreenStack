'use strict';

var angular = require('angular');
require('angular-mocks');

var ssoWidget = require('./sso-widget.directive');
var rootScope,compile,element,$window, ssoArtifactsService,$scope;

describe('sso-widget directive', function() {
	beforeEach(function() {

		var moduleName = 'app.main.sso';
		var mock$window = function () {

		};
		var mockssoArtifactsService = function () {

		};
		angular
			.module(moduleName, [])
			.service('$window',mock$window)
			.service('ssoArtifactsService',mockssoArtifactsService)
			.directive('ssoWidget', ssoWidget);

		angular.mock.module(moduleName);
	});

	beforeEach(inject(function($rootScope,$compile,_$window_,_ssoArtifactsService_){
		rootScope = $rootScope;
		$scope = $rootScope.$new();
		compile = $compile;
		$window=_$window_;
		ssoArtifactsService=_ssoArtifactsService_;
	}));

	/*it('validate annual exemption amount testing',function(){
		element = angular.element('<input type="text" value="sso" ng-model="sso" sso-widget></input>');
		compile(element)(rootScope.$new());
		rootScope.$digest();

	});*/
	/*it('validate annual exemption amount testing',function(){
            var data ={};
			$scope.doPOST(data);
	});
	it('validate annual exemption amount testing',function(){
            var data ={};
			$scope.bindErrorMessage(data);
	});*/
});
