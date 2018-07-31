'use strict';

require('./tn-employee-image.component.scss');

module.exports = {
	template: require('./tn-employee-image.component.html'),
	bindings:{
		imgUrl: '@',
		employeeName: '@'
	}
};
