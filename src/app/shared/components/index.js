module.exports = 'trinet.shared.components';

var angular = require('angular');

var modules = [
	require('./company-annoucements-card'),
	require('./important-notices-card'),
	require('./date-info'),
	require('./tn-earnings-statement'),
	require('./tn-profile'),
	require('./tn-pay-period'),
	require('./tn-browser-modal'),
	require('./tn-notices-event-base')
];
angular.module('trinet.shared.components', modules)
	.component('tnHeaderBar', require('./tn-header-bar/tn-header-bar.component'))
	.component('tnSearchHeaderBar',require('./tn-search-header-bar/tn-search-header-bar.component'))
	.component('tnErrorBanner',require('./tn-error-banner/tn-error-banner.component'))
	.component('tnRepeat', require('./tn-repeat/tn-repeat.component'))
	.component('tnRetirementCard',require('./tn-retirement-card/tn-retirement-card.component'))
	.component('tnPaycheckDetailsCard',require('./tn-paycheck-details-card/tn-paycheck-details-card.component'))
	.component('tnEarningsStatement',require('./tn-earnings-statement/tn-earnings-statement.component'))
	.component('tnMenu', require('./tn-menu/tn-menu.component'))
	.component('tnSecondaryContainer',require('./tn-secondary-container/tn-secondary-container.component'))
	.component('tnEditProfile',require('./tn-edit-profile/tn-edit-profile.component'))
	.component('tnEditProfileAddress',require('./tn-edit-profile/tn-edit-profile-address/tn-edit-profile-address.component'))
	.component('tnEditProfileNamesContacts',require('./tn-edit-profile/tn-edit-profile-names-contacts/tn-edit-profile-names-contacts.component'))
	.component('tnEditProfileEmergency',require('./tn-edit-profile/tn-edit-profile-emergency/tn-edit-profile-emergency.component'))
	.component('tnEditProfilePersonalData',require('./tn-edit-profile/tn-edit-profile-personal-data/tn-edit-profile-personal-data.component'))
	.component('tnEditProfilePersonalInfo',require('./tn-edit-profile/tn-edit-profile-personal-info/tn-edit-profile-personal-info.component'))
	.component('tnTaxesDeductionsTable',require('./tn-taxes-deductions-table/tn-taxes-deductions-table.component'))
	.component('tnHoursEarningsTable',require('./tn-hours-earnings-table/tn-hours-earnings-table.component'))
	.component('tnCompanyName',require('./tn-company-name/tn-company-name.component'))
	.component('tnConfirmationModal',require('./tn-confirmation-modal/tn-confirmation-modal.component'))
	.component('tnFlyoutError',require('./tn-flyout-error/tn-flyout-error.component'))
	.component('tnSsoRedirectModal',require('./tn-sso-redirect-modal/tn-sso-redirect-modal.component'))
	.component('tnViewHistory',require('./tn-view-history/tn-view-history.component'))
	.component('tnLoginToBetaModal',require('./tn-login-to-beta-modal/tn-login-to-beta-modal.component'))
	.component('tnproxyConfirmationModal',require('./tn-proxyConfirmation-modal/tn-confirmation-modal.component'))
	.component('tnSwitchViewModal',require('./tn-switch-view-modal/tn-switch-view-modal.component'))
	.component('tnTooltip',require('./tn-tooltip/tn-tooltip.component'))
	.component('tnTitle',require('./tn-title/tn-title.component'))
	.component('tnFutureModal',require('./tn-future-details-card/tn-future-modal.component'))
	.component('tnEformsAcknowledgementModal',require('./tn-eforms-acknowledgement-modal/tn-eforms-acknowledgement-modal.component'))
	.component('tnProxyMessageModal',require('./tn-proxy-message-modal/tn-proxy-message-modal.component'))
	.component('tnPdfViewModal',require('./tn-pdf-view-modal/tn-pdf-view-modal.component'));
