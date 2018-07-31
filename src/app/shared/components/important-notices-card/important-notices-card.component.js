'use strict';

require('./important-notices-card.component.scss');

module.exports = {
	template: require('./important-notices-card.component.html'),
	controller: ['$timeout', 'DS', '$state' , '$filter', '$uibModal',ImportantNoticesCardController]
};

function ImportantNoticesCardController($timeout, DS, $state , $filter, $uibModal) {
	var ctrl = this;
	ctrl.$onInit = function() {
	ctrl.date = new Date();
	ctrl.prorityType = {
		"0": "High",
		"1": "Medium",
		"2": "Low"
	};
	DS.find('notices', '').then(function(results){
    			ctrl.notices = results.res;
    			if (results.res) {
    				var keys = Object.keys(results.res);
    				var arr = [];
    				keys.map(function (keyName, index) {
    					if (keyName === 'current' ) {
    						arr = arr.concat(results.res[keyName]);
    					}
    				});
    				ctrl.noticesLength = arr.length;
    				ctrl.currentNotices = arr.slice(0, 3);
    				ctrl.setFullnotices = arr;
    				ctrl.currentNoticesLength = ctrl.currentNotices.slice(0, 3).length;
                    ctrl.showMore();
    			}
    		}).catch(function(err) {
					ctrl.currentNotices = [];
					ctrl.notices = [];
					ctrl.noticesLength = 0;
					ctrl.currentNoticesLength = 0;
    		});

    		ctrl.showSpinner = true;
	};
	ctrl.showMore = function(){
		ctrl.setFullnotices.map(function (notices) {
			if (notices.title.length > 65) {
				notices.isShowMore = true;
				//notices.title = notices.title.slice(0 , 65) + "... ";
			}
		});
	};
	ctrl.getPriority = function(key,item){
		var setPriotity = (key === item.priority.toString()) ?  true : false;
		return setPriotity;
	};
	ctrl.more = function(notices, index){
		/*notices.title = ctrl.currentNotices[index].title;*/
     		var modal = $uibModal.open({
        			template  : '<view-notice-modal></w4-legal-modal>',
        			component : 'viewNoticeModal',
        			windowClass : 'view-notice',
        			resolve   : {
                    				data: function() { return angular.merge({}, notices); }
                    			}
        		});

        		return modal.result;

	};
	ctrl.getBodyParseValue = function(value){
		var textFormat = value.slice(0 , 60);
		if(textFormat.match(/\n/g)){
			textFormat = textFormat.split("\n", 3).join("\n");
		}
		return  textFormat.replace(/(?:\r\n|\r|\n)/g, '<br />');
	};

	ctrl.showNotices = function () {
		$state.transitionTo('app.main.company-notices', {id: ctrl.notices});
	};
	$timeout(function () {
		ctrl.showSpinner = false;
	}, 2000);
}
