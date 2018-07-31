var angular = require('angular');

var routesConfig = require('./routes.config');
var languagesConfig = require('./languages.config');
var jsDataConfig = require('./js-data.config');
var benefitsUrlConfig = require('./benefits-url.config');
var companyUrlConfig = require('./company-url.config');
var constantsConfig = require('./constants.config');
var empUrlConfig = require('./emp-url.config');
var moneyUrlConfig = require('./money-url.config');
var profileUrlConfig = require('./profile-url.config');
var loginUrlConfig = require('./login-url.config');
var homeUrlConfig = require('./home-url.config');
var globalUrlConfig = require('./global-url.config');
var fileConfig = require('./static-file.config');
var carrierUrlConfig = require('./carriers-url.config');
var imageConfig = require('./images.config');
var ssoModalLinksConfig = require('./sso-modal-links.config');
var greenStackInterceptor = require('./interceptor.config');
var userIdleConfig = require('./user-idle.config');
var logoImagesConfig = require('./logo-images.config');
var newhireUrlConfig = require('./newhire-url.config');
var paidTimeOffRules= require('./paid-timeoff-ruleSet.js')
/*var appConfig = require('./value.config');*/

var moduleName = 'appConfig';
module.exports = moduleName;

angular.module(moduleName, [])
	.config(languagesConfig)
	.config(routesConfig)
	.config(jsDataConfig)
    .config(greenStackInterceptor)
	.config(userIdleConfig)
	.constant('benefitsUrlConfig', benefitsUrlConfig)
	.constant('companyUrlConfig', companyUrlConfig)
	.constant('constants', constantsConfig)
	.constant('manageEmpUrlConfig', empUrlConfig)
	.constant('profileUrlConfig',profileUrlConfig)
	.constant('moneyUrlConfig',moneyUrlConfig)
	.constant('loginUrlConfig',loginUrlConfig)
	.constant('homeUrlConfig',homeUrlConfig)
	.constant('globalUrlConfig', globalUrlConfig)
	.constant('fileConfig', fileConfig)
	.constant('imageConfig', imageConfig)
	.constant('carrierUrlConfig', carrierUrlConfig)
	.constant('ssoModalLinksConfig', ssoModalLinksConfig)
	.constant('logoImagesConfig', logoImagesConfig)
	.constant('newhireUrlConfig', newhireUrlConfig)
	.constant('paidTimeOffRules',paidTimeOffRules);
  /*.value('appConfig', appConfig);*/
