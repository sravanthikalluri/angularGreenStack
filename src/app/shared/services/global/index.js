'use strict';

var angular = require('angular');
var moduleName = 'trinet.shared.services.global';

module.exports = moduleName;

angular.module(moduleName, [])
	.service('apiConfigService', require('./api-config.service'))
	.service('apiConfigDataService', require('./api-config-data.service'))
	.service('companyNameService', require('./company-name.service'))
	.service('crudService', require('./crud.service'))
	.service('genericService', require('./generic.service'))
	.service('gso', require('./global.service'))
	.service('operationService', require('./operation.service'))
	.service('sharedProperties', require('./shared-prop.service'))
	.service('translationService', require('./translation.service'))
	.service('utilService', require('./util.service'))
	.service('FormOfAddresses', require('./generic/form-of-address.service'))
	.service('AccessTypesService', require('./generic/access-types.service'))
	.service('AddressTypesService', require('./generic/address-types.service'))
	.service('CountriesService', require('./generic/countries.service'))
	.service('EthnicityService', require('./generic/ethnicity.service'))
	.service('GendersService', require('./generic/genders.service'))
	.service('MaritalStatusService', require('./generic/marital-status.service'))
	.service('MediaTypesService', require('./generic/media-types.service'))
	.service('MilitaryStatusesService', require('./generic/military-status.service'))
	.service('RelationShipsService', require('./generic/relation-ships.service'))
	.service('StatesService', require('./generic/states.service'))
	.service('SuffixesService', require('./generic/suffixes.service'))
	.service('navigationService',require('./navigation.service'))
	.service('navigationService',require('./navigation.service'))
	.service('passportUrlBuildService',require('./passport-url-build.service'))
	.service('hrpSignOnService',require('./hrp-sign-on.service'))
	.service('hrpUserToken',require('./hrp-sign-on-u.service'))
	.service('SharedDataService',require('./shared-data.service'));
