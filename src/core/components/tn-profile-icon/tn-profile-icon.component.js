'use strict';

require('./tn-profile-icon.component.scss');

module.exports = {
	template: require('./tn-profile-icon.component.html'),
		controller: tnProfileIconController,
		transclude: true,
		bindings: {
			imgUrl: '@',
			mimeType: '@',
			className: '@',
			onClick: '&',
			isActive: '=',
			monogram: '@',
			fullname:'@'
	}

};

function tnProfileIconController() {
	var ctrl = this;
	ctrl.clicked = function(){
		ctrl.isActive = false;
	}
};

