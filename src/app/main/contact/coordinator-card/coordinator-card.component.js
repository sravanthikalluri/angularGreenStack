'use strict';

require('./coordinator-card.component.scss');
require('../contact.component.scss');

module.exports = {
	template: require('./coordinator-card.component.html'),
	bindings: {
		contacts: '<',
		isAmbrose: '<'
	}
};
