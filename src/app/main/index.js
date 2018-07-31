var angular = require('angular');

var dashboardModule = require('./dashboard');
var moneyModule = require('./money');
var benefitsModule = require('./benefits');
var companyModule = require('./company');
var teamModule = require('./team');
var settingsModule = require('./settings');
var contactModule = require('./contact');
var ssoModule = require('./sso');
var helpModule = require('./help');

var mainComponent = require('./main.component');
var profileComponent = require('./profile');
var editProfileComponent = require('./edit-profile');
var publicProfileComponent = require('./public-profile');
var companyAnnouncementsComponent = require('./company-announcements');
var noticeComponent = require('./company-notices');
var deviceDetector = require('ng-device-detector');

var moduleName = 'main';
module.exports = moduleName;

angular.module(moduleName, [dashboardModule,
							moneyModule,
							benefitsModule,
							settingsModule,
							profileComponent,
							editProfileComponent,
							companyModule,
							teamModule,
							contactModule,
							ssoModule,
							helpModule,
							publicProfileComponent,
							companyAnnouncementsComponent,
							noticeComponent,
							deviceDetector])
  .component('main', mainComponent);
