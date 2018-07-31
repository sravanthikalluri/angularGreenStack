'use strict';

require('./employee-card.component.scss');
require('../contact.component.scss');


module.exports = {
	template: require('./employee-card.component.html'),
	bindings: {
		data: '<',
		status: '<'
	},
	controller: ['gso','$window',EmployeeCardController]
};

function EmployeeCardController(gso,$window) {
	var ctrl = this;
	ctrl.liveChatCode = gso.getAppConfig().liveChatCodeForHtml;
	ctrl.showLiveChat = gso.getAppConfig().pfClient != "0000" ? true:false;
	ctrl.createDynamicOnlickEvent = function (chatCode) {
		liveagent.startChat(chatCode);
		$window.ga('send', 'event', 'buttons', 'click', 'TrinetLiveChat-EmployeeView');
	}
}



