var angular = require('angular');
var moduleName = 'trinet.core.components';
var modules = [
	require('./tn-card'),
	require('./tn-chip'),
	require('./tn-toggle'),
	require('./tn-donut-chart'),
	require('./tn-donut-chart-legend'),
	require('./tn-radial-progress-chart'),
	require('./tn-stacked-bar-chart'),
	require('./tn-datepicker'),
	require('./tn-input-container'),
	require('./tn-checkbox-container'),
	require('./tn-checkbox'),
	require('./forms')
];

module.exports = moduleName;

angular.module(moduleName, modules)
	.component('tnButton', require('./tn-button/tn-button.component'))
	.component('tnMenuLink', require('./tn-menu-link/tn-menu-link.component'))
	.component('tnMenuToggle', require('./tn-menu-toggle/tn-menu-toggle.component'))
	.component('tnProfileIcon', require('./tn-profile-icon/tn-profile-icon.component'))
	.component('tnTabs', require('./tn-tabs/tn-tabs.component'))
	.component('tnTab', require('./tn-tabs/tn-tab.component'))
	.component('tnProfileMenu', require('./tn-profile-menu/tn-profile-menu.component'))
	.component('tnSearchBox', require('./tn-search-box/tn-search-box.component'))
	.component('tnSearchButton', require('./tn-search-button/tn-search-button.component'))
	.component('tnSmallEmployeeCard', require('./tn-small-employee-card/tn-small-employee-card.component'))
	.component('tnEmployeeImage', require('./tn-employee-image/tn-employee-image.component'))
	.component('tnTable', require('./tn-table/tn-table.component'))
	.component('tnModal', require('./tn-modal/tn-modal.component'))
	.component('tnComboBox', require('./tn-combo-box/tn-combo-box.component'))
	.component('tnLayoutDivider', require('./tn-layout-divider/tn-layout-divider.component'))
	.component('tnTextBox', require('./tn-text-box/tn-text-box.component'))
	.component('tnSpinner',require('./tn-spinner/tn-spinner.component'))
	.component('tnFullSpinner',require('./tn-full-spinner/tn-full-spinner.component'))
	.component('tnDateSelector',require('./tn-date-selector/tn-date-selector.component'));
