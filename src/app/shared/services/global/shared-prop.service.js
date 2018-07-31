'use strict';
module.exports = sharedProperties;
/* @ngInject */
	function sharedProperties() {
    var alertObject = {};
    var bool;
    var selectedCountry = {};
    var string;
    var object = [];
    var primaryNameData = null;
    var primaryNameDataBoolValue = false;
    var broadcastContactBoolValue = false;
		var componentsPermissions = {};
		var componentsEmpMenuPermissions = {};
		var componentSelectedMenuPermissions = {};
		var widgetInfo = {};
    return {
        getAlertObject: function () {
            return alertObject;
        },
        setAlertObject: function (value) {
            alertObject = value;
        },

        getSelectedCountry: function () {
            return selectedCountry;
        },
        setSelectedCountry: function (value) {
            selectedCountry = value;
        },
        getObject: function () {
            return object;
        },
        setObject: function (result) {
            object = result;
        },
        getStringValue: function () {
            return string;
        },
        setStringValue: function (value) {
            string = value;
        },
        getboolValue: function () {
            return bool;
        },
        setboolValue: function (value) {
            bool = value;
        },
        setPrimaryNameData: function (value) {
            primaryNameData = value;
        },
        getPrimaryNameData: function () {
            return primaryNameData;
        },
        setPrimaryNameDataBoolValue: function (value) {
            primaryNameDataBoolValue = value;
        },
        getPrimaryNameDataBoolValue: function () {
            return primaryNameDataBoolValue;
        },
        setBroadcastContactBoolValue: function (value) {
            broadcastContactBoolValue = value;
        },
        getBroadcastContactBoolValue: function () {
            return broadcastContactBoolValue;
        },
				setComponentPermissions: function (permObject) {
					componentsPermissions = permObject;
				},
				getComponentPermissions: function () {
					return componentsPermissions;
				},
				setComponentSelectedMenuPermissions: function (selectedPermObject) {
					componentSelectedMenuPermissions = selectedPermObject;
				},
				getComponentSelectedMenuPermissions: function () {
					return componentSelectedMenuPermissions;
				},
				setComponentEmpMenuPermissions: function (empPermObject) {
					componentsEmpMenuPermissions = empPermObject;
				},
				getComponentEmpMenuPermissions: function () {
					return componentsEmpMenuPermissions;
				},
				setWidgetInfo: function(widgetData){
					widgetInfo = widgetData;
				},
				getWidgetInfo: function(){
					return widgetInfo;
				}
    };
}
