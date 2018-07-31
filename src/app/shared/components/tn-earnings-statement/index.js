module.exports = 'trinet.shared.components.tn-earnings-statement';

var angular = require('angular');
var modules = [];

angular.module('trinet.shared.components.tn-earnings-statement', modules)
	.component('tnEarningsStatementModal',require('./tn-earnings-statement-modal/tn-earnings-statement-modal.component'));
