'use strict';

var angular = require('angular');
var moduleName = 'app.main.money.taxes.w4-elections-card.w4-elections-table.w4-pdf-links';

module.exports = moduleName;

angular.module(moduleName, [])
	.component('w4PdfLinks', require('./w4-pdf-links.component'));
