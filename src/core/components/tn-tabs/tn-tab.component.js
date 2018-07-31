'use strict'

module.exports = {
    replace: true,
    transclude: true,
    require: {
      tabs: '^tnTabs'
    },
    bindings: {
      label: '@'
    },
    controller: TnTabController,
    template: require('./tn-tab.component.html')
};

function TnTabController() {
	var ctrl = this;

	ctrl.$onInit = function() {
		//Declaring functions to be defined in tn-tabs
		ctrl.isActive = function(){};
		ctrl.isLeft = function(){};
		ctrl.isRight = function(){};
		ctrl.shouldShow = true;

		ctrl.tabs.addTab(this);
	}
}
