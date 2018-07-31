'use strict';

module.exports = GetAcrobatInfoService;

function GetAcrobatInfoService() {
	var service = {};

	var ctrl = this;

	ctrl.getBrowserName = function() {

			var browser = "";
			var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";

			if(userAgent.indexOf("chrome") > -1){
				browser = "chrome";
			} else if(userAgent.indexOf("safari") > -1){
				browser = "safari";
			} else if(userAgent.indexOf("msie") > -1){
				browser = "ie";
			}else if(userAgent.indexOf("firefox") > -1){
				browser = "firefox";
			}else if(userAgent.indexOf("trident") > -1){
				//For each IE version since at least IE 8, the Trident version has been the IE version - 4. So IE 8 had Trident/4.0.So IE 11 had Trident/7.0
				browser = "ie";
			}

			return browser;
	};

	ctrl.getActiveXObject = function(name) {
    try { return new ActiveXObject(name); } catch(e) {}
  };

	ctrl.getNavigatorPlugin = function(name) {
		var key;
    for(key in navigator.plugins) {
      var plugin = navigator.plugins[key];
      if(plugin.name == name) return plugin;
    }
  };

	ctrl.getPDFPlugin = function() {
    return ctrl.plugin = function() {
      if(ctrl.getBrowserName() == 'ie') {
        //
        // load the activeX control
        // AcroPDF.PDF is used by version 7 and later
        // PDF.PdfCtrl is used by version 6 and earlier
        return ctrl.getActiveXObject('AcroPDF.PDF') || ctrl.getActiveXObject('PDF.PdfCtrl');
      }
      else {
        return ctrl.getNavigatorPlugin('Adobe Acrobat') || ctrl.getNavigatorPlugin('Chrome PDF Viewer') || ctrl.getNavigatorPlugin('WebKit built-in PDF');
      }
    }();
  };

	ctrl.isAcrobatInstalled = function() {
    return !!ctrl.getPDFPlugin();
  };

	ctrl.getAcrobatVersion = function() {
    try {
      var plugin = ctrl.getPDFPlugin();

      if(ctrl.getBrowserName() == 'ie') {
        var versions = plugin.GetVersions().split(',');
        var latest   = versions[0].split('=');
        return parseFloat(latest[1]);
      }

      if(plugin.version) return parseInt(plugin.version);
      return plugin.name

    }
    catch(e) {
      return null;
    }
  }

}
