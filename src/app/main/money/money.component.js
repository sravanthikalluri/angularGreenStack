'use strict';

require('./money.component.scss');

module.exports = {
	templateUrl: 'app/main/money/money.component.html',
	controller: ['DS',MoneyController]
};

function MoneyController(DS) {
	var ctrl = this;

	ctrl.$onInit = function() {
	};
}
