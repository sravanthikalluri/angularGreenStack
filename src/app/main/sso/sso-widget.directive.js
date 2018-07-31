'use strict';

/*
This directive is used to dynamically fetch the sso Artifacts
and construct the request based on the payload.
This is needed since we have a heterogenious group of SingleSignOn , with
different parameters , http methods and sso servers.
@Author : Laji Thomas
*/

/* @ngInject */
module.exports = function($window, ssoArtifactsService) {
	return {
		restrict: 'EA',
		scope: {
			urlParams: '@'
		},
		controller: ['$scope', '$sce', function($scope, $sce) {
			$scope.postParams = [];
			$scope.spinnerClass = true;
			$scope.showErrorClass = false;
			$scope.postURL = '';
			$scope.ssoId = angular.fromJson($scope.urlParams).ssoId;
			$scope.param = angular.fromJson($scope.urlParams).param;
			$scope.bindErrorMessage = function(data) {
				var errorAlert = {
					_statusCode: '503',
					_statusMessage: 'Service UnAvailable'
				};

				if (data && data._statusCode && data._statusMessage) {
					errorAlert._statusCode = data._statusCode;
					errorAlert._statusMessage = data._statusMessage;
				}
				$scope.spinnerClass = false;
				$scope.errorAlert = errorAlert;
			};

			$scope.doPOST = function(data) {
				$scope.spinnerClass = false;
				$scope.postURL = $sce.trustAsResourceUrl(data.ssoServerURL);
				var isBase64Encoded = data.base64Encoded;
				var decodedParams = null;
				var params = null;
				if (isBase64Encoded) {
					decodedParams = atob(data.postParams);
					params = decodedParams.indexOf('&') ? decodedParams.split('&') : [];
				}
				else {
					params = data.postParams.indexOf('&') ? data.postParams.split('&') : [];
				}

				params.map(function(param) {
					var keyValue = param.split(/=(.+)/)

					var retObj = {
						name: keyValue[0],
						value: keyValue[1]
					};
					$scope.postParams.push(retObj);
					return retObj;
				});

				// Let the current process complete, so the dynamic inputs are
				// available to be posted (Without this , the post will not be
				// having any dynamically added inputs). Another method would be
				// to watch the form element , for childre being added.
				// This seems to be simpler.

				$window.setTimeout(function() {
					// angular.element('.ssopost')[0].submit();
					document.getElementById('ssopost').submit();
				}, 0);
			};

			$scope.doGET = function(ssoUrl) {
				$scope.spinnerClass = false;
				$window.location.href = ssoUrl;
			};

			$scope.validateData = function(data) {
				return data && data.ssoServerURL && data.httpMethod;
			};

			$scope.isGetRequest = function(response) {
			 	return response.httpMethod.toUpperCase() === 'GET';
			};

			// added a function to get the new json parameter 'isCacheable' value(true/false) isCacheable GS-6682
			$scope.isCacheable = function(data) {
				return data.isCacheable;
			};

			$scope.processServerResponse = function(ssoArtifactsData, storageKey) {

				if ($scope.validateData(ssoArtifactsData)) {
					$scope.isCacheable(ssoArtifactsData) && ssoArtifactsService.cacheSSOResponseToLocalStorage(ssoArtifactsData, storageKey);
					if ($scope.isGetRequest(ssoArtifactsData)) {
						$scope.doGET(ssoArtifactsData.ssoServerURL);
					} else {
						$scope.doPOST(ssoArtifactsData);
					}
				}
			};

			(function init() {
				var userId = $window.sessionStorage.getItem('empId');
				var companyId = $window.sessionStorage.getItem('companyId');
				var peoId = $window.sessionStorage.getItem('peoId');

				var storageKey = ssoArtifactsService.createStorageKey(userId, companyId, peoId, $scope.ssoId, $scope.param);
				var ssoArtifacts = ssoArtifactsService.getSSOResponseFromLocalStorage(storageKey);
				var options = {
					companyId: companyId,
					ssoId: $scope.ssoId,
					peoId: peoId,
					param: $scope.param || ''
				};

				if (!ssoArtifacts) {
					ssoArtifactsService.find('', options).then(function(ssoArtifacts) {
						$scope.processServerResponse(ssoArtifacts, storageKey);
					}).catch(function(err) {
						$scope.errorResponse = {};
						$scope.errorResponse._statusMessage = err.data._error.message;
					});
				}
				else {
					$scope.processServerResponse(ssoArtifacts, storageKey);
				}
			})();

		}],
		template: require('./sso-widget.directive.html')
	};
};
