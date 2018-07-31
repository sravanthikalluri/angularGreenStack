'use strict';

module.exports = languagesConfig;

/** @ngInject */
function languagesConfig($translateProvider) {
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'assets/i18n/',
      suffix: '.json'
    })
    .registerAvailableLanguageKeys(['en'], {
      'en_*': 'en'
    })
    .preferredLanguage('en')
    .fallbackLanguage('en')
    .useSanitizeValueStrategy('escapeParameters');
}
