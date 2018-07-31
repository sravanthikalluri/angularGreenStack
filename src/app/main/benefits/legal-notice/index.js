'use strict';

var angular = require('angular');
var legalNotice = require('./legal-notice.component');
var tnNoticeCard = require('./tn-notice-card/tn-notice-card.component');
var tnNoticeItem = require('./tn-notice-item/tn-notice-item.component');

var moduleName = 'app.main.benefits.legal-notice';

module.exports = moduleName;

angular
	.module(moduleName, [])
	.component('benefitsLegalNotice', legalNotice)
	.component('tnNoticeCard', tnNoticeCard)
	.component('tnNoticeItem', tnNoticeItem);;