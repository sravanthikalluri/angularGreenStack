'use strict';

module.exports = {
	template: require('./tn-card-title-group.component.html'),
	transclude: {
		'titles': '?tnCardTitle',
		'subtitle': '?tnCardSubtitle'
	}
};
