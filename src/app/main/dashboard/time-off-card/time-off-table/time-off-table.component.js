'use strict';

require('./time-off-table.component.scss');

module.exports = {
	template: require('./time-off-table.component.html'),
	bindings: {
		requests: '<'
	}
}
