'use strict';

var angular = require('angular');

// Third party libs
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-translate');

require('angular-translate-loader-static-files');
require('d3');
require('js-data-angular');
require('angular-moment');
require('angular-animate');
require('angular-cookies');
require('angular-sanitize');
require('angular-messages');
require('ng-mask');
require('ngmap');
require('angular-touch');
require('ng-disable-scroll');
require('ng-draggable');
require('ng-idle');
require('angular-aria');

// Global Styling
require('bootstrap/dist/css/bootstrap.css');
require('./styles/main.scss');

var appConfig = require('./config/index');
var appModule = require('./app/index');
var modules = [
	// Third-party
	'ui.router',
	'ui.bootstrap',
	'pascalprecht.translate',
	'js-data',
	'angularMoment',
	'ngMessages',
	'ngAnimate',
	'ngCookies',
	'ngSanitize',
	'ngMask',
	'ngMap',
	'ngTouch',
	'ngDisableScroll',
	'ngDraggable',
	'ngIdle',
	'ngAria',
	//'ngAnimateMock',
	// Greenstack specific
	appConfig,
	appModule
];

angular
  .module('greenstackv2', modules)
	.value('valueConfig', {
	userId: "",
	companyId: "",
	countryCode: "",
	pfClient: "",
	designation: "",
	positionId: "",
	stateCode: "",
	username: "",
	authToken: "",
	companyName: "",
	holidaySchedule: "",
	workCity:"",
	profilePicture:"",
	mimeType:"",
	emplRcd:""
});
