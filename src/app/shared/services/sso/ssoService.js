'use strict';
trinetApp.service('ssoService', ['$http', '$resource', 'appConfig', function ($http, $resource, appConfig) {
    return {

        construtURLforGetSSOArtifactForID: function (resourceBaseUrl, resource, urlParams) {
            return resourceBaseUrl + appConfig.companyId + "/" +
                appConfig.userId + resource + urlParams.ssoId+"?peoId="+appConfig.peoId;
        },

        getSSOResponseFromLocalStorage: function (storageKey) {
            var ssoResponseAsJson = localStorage.getItem(storageKey);
            if (ssoResponseAsJson) {
                return angular.fromJson(ssoResponseAsJson);
            }
            return null;
        },

        cacheSSOResponseToLocalStorage: function (values, storageKey) {
            if (!angular.equals(values, this.getSSOResponseFromLocalStorage(storageKey))) {
                localStorage.setItem(storageKey, angular.toJson(values));
            }
        }
    };
}]);


