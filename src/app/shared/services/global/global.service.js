'use strict';
module.exports = globalService;

/* @ngInject */
function globalService(utilService, crudService, valueConfig, $compile, apiConfigDataService, SharedDataService/*, $routeParams*/) {

		this.getUtilService = function(){
			return utilService;
		};
		this.getCrudService = function(){
			return crudService;
		};
		this.getAppConfig = function(){
			return valueConfig;
		};
		this.getCompile = function(){
			return $compile;
		};
		this.getAPIConfigDataService = function(){
			return apiConfigDataService;
		};

		this.getSharedData = function (){
			return sharedData;
		}
		/*this.getRouteParams = function(){
			return $routeParams;
		};*/

}
