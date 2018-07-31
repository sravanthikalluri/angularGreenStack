'use strict';

require('./browserSupport.component.scss');

module.exports = {
	template: require('./browserSupport.component.html'),
	controller: browserSupportCtrl
};

/* @ngInject */
function browserSupportCtrl() {
	var ctrl = this;
}
