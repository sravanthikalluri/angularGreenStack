'use strict';

var angular = require('angular');
var moduleName = 'app';

require('../styles/main.scss');

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./shared'),
		require('../core'),
		require('./login'),
		require('./main')
	])

	.component('app', require('./app.component'))
	.value('$anchorScroll', angular.noop)
	/* @ngInject */
	.run(function(services, $rootScope, Idle, utilService, $window, $state, SharedDataService) {
		services.init();
		Idle.watch();
		$rootScope.$on('IdleStart', function() {
			utilService.setAlert('alertLoader');
		});
		$rootScope.$on('IdleTimeout', function() {
			localStorage.clear();
			$window.sessionStorage.clear();
			utilService.redirectToSSOLogout();
		});
		$rootScope.$on('menuLoad', function(e, data) {
			var maintitle;
			maintitle =  utilService.traverseJSON(data.data, $state.current.name, '');
			$state.current.title = ' | '+ (maintitle ||  ($state.current.data.title ? $state.current.data.title: ''));
		});
		$rootScope.$on("$stateChangeSuccess", function (currentRoute, previousRoute) {
			var maintitle, navigationSide;
			navigationSide = SharedDataService.getAppSharedData().navigationSide;
			if(navigationSide){
				navigationSide = JSON.parse(navigationSide);
				maintitle = utilService.traverseJSON(navigationSide, $state.current.name ,'');
				$state.current.title = ' | '+ (maintitle ||  ($state.current.data.title ? $state.current.data.title: ''));
			}
			$rootScope.$state = $state;
		});
	});
