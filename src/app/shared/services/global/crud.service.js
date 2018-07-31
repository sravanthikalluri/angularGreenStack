/* This is the service using to do CRUD operations* */
'use strict';
module.exports = crudService;
/* @ngInject */
    function crudService (operationService) {
        var svc = this;
        svc.execute = function (method, restUrl, data, successCb, errorCb) {
            // async call => need to use a callback to continue the work
			operationService(method, restUrl, data, successCb, errorCb);
        };

    }
