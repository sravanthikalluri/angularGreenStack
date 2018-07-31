'use strict';

require('./date-info.component.scss');

module.exports = {
	template: require('./date-info.component.html'),
	bindings: {
		titles: '@',
		titleColor: '@',
		date: '<',
		customId: '<'
	}
};
