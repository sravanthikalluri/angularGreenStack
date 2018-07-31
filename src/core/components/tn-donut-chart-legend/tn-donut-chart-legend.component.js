'use strict';

require('./tn-donut-chart-legend.component.scss');

module.exports = {
	template: require('./tn-donut-chart-legend.component.html'),
	bindings: {
		data: '<',
		colors: '<'
	}
}
