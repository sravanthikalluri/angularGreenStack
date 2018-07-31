'use strict';

require('./notices-event-base-card.component.scss');

module.exports = {
    template: require('./notices-event-base-card.component.html'),
    controller: ['SharedDataService', 'DS', 'gso',NoticeEventBaseController]
};

function NoticeEventBaseController(SharedDataService, DS, gso) {
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.showSpinner = true;
		ctrl.showDate = false;
        DS.find('notices-event','').then(function(results){
            results.res.map(function (item) {
				switch(item.noticeId) {
					case "CBR_01":
						break;
					case "ALE_02":
						break;
					case "BNH_01":
						break;
					case "BNH_02":
						break;
					case "BNH_03":
						break;
					case "BNH_10":
						break;
					case "BNH_11":
						break;
					default:
						item.redirectUrl = SharedDataService.getAppSharedData().hrpUrl + item.redirectUrl;
				}
				ctrl.showDate = ((item.noticeId === "ALE_01")||(item.noticeId === "ALE_02")) ? false : true;
				item.isAle =  (item.noticeId === "ALE_01") ? true : false;
            });
            ctrl.noticeEventData= results.res;
            ctrl.showSpinner = false;
        }).catch(function(err){
            ctrl.showSpinner = false;
        });
    };

    //Binding environmental path to url
    function getURL(url){
        var redirectURL = '//' + SharedDataService.getAppSharedData().hrpUrl + url;
        return redirectURL;
    }

    

}
