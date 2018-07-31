'use strict';

require('./tn-layout-divider.component.scss');

/**
 * @usage
 * <tn-layout-divider direction="vertical"></tn-layout-divider>
 * TODO: implement direction: horizontal | vertical
 * default to horizontal
 */

module.exports = {
	template: require('./tn-layout-divider.component.html'),
	bindings: {
		direction: '@'
	}
};
