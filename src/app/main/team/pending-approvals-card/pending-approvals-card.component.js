'use strict';

require('./pending-approvals-card.component.scss');

module.exports = {
	templateUrl: 'app/main/team/pending-approvals-card/pending-approvals-card.component.html',
	bindings: {
		title: '<',
		subtitle: '<',
		buttonText: '<',
		tableTitles: '<',
		tableData: '<'
	}
};
