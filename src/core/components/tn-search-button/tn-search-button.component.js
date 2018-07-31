'use strict';

require('./tn-search-button.component.scss');

module.exports = {
	template:  require('./tn-search-button.component.html'),
	bindings: {
		onButtonClicked: '&'
	}
};

