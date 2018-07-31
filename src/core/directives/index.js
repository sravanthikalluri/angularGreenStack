'use strict';

var angular = require('angular');
var moduleName = 'trinet.core.directives';

module.exports = moduleName;

angular
	.module(moduleName, [
		require('./tn-input-validators')
	])

	.directive('tnButton', require('./tn-button/tn-button.directive'))
	.directive('tnActionButton', require('./tn-action-button/tn-action-button.directive'))
	.directive('tnLinkButton', require('./tn-link-button/tn-link-button.directive'))
	.directive('tnMenuLightButton', require('./tn-menu-light-button/tn-menu-light-button.directive'))
	.directive('tnOffClick', require('./tn-off-click/tn-off-click.directive'))
	.directive('tnBanner', require('./tn-banner/tn-banner.directive'))
	.directive('tnInputRestriction', require('./tn-input-restriction/tn-input-restriction.directive'))
	.directive('tnBindHtml', require('./tn-bind-html/tn-bind-html.directive'))
	.directive('tnScroll',require('./tn-scroll/tn-scroll.directive'))
	.directive('tnPrint',require('./tn-print/tn-print.directive'))
	.directive('tnEnter',require('./tn-enter-action/tn-key-enter.directive'))
	.directive('setFocus',require('./set-focus/set-focus.directive'))
    .directive('focusInvalidField',require('./focus-invalid-field/focus-invalid-field.directive'))
	.directive('tnCurrencyFormat',require('./tn-currency-format/tn-currency-format.directive'))
	.directive('phoneFormat',require('./tn-phone-format'));
