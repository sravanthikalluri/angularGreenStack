'use strict';
module.exports = SharedDataService;

/* @ngInject */
	function SharedDataService() {
    var appSharedData = {};

    return {
        getAppSharedData: function () {
            return appSharedData;
        }
    };
}
