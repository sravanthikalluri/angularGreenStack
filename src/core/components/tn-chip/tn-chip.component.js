'use strict';

require('./tn-chip.component.scss');

module.exports = {
	template: require('./tn-chip.component.html'),
	bindings: {
		label: '@',
		color: '='
	}
};


