'use strict';

module.exports = MenuService;

/* @ngInject */

function MenuService(DS,navigationService,sharedProperties) {
	return DS.defineResource({
		name: 'menu',
		idAttribute: 'id',
		endpoint: '/api-navigation/v1/menu/' + '{companyId}/{empId}' +'/menu-items',

		deserialize: function(resourceConfig, response) {
			var menu, type, icon, subMenus, firstChildMenu;

			if (response.data.data.menuItems && angular.isArray(response.data.data.menuItems)) {

				var widgetInfo = navigationService.transformWidgetResponse(response.data.data.menuItems);

				sharedProperties.setWidgetInfo(response.data.data.menuItems);
				return response.data.data.menuItems.filter(function(m) {return m.name !== 'My Profile'}).map(function(item) {
					//return response.data.data.menuItems.filter(function(m) {return m.name !== 'My Profile'}).filter(function(m) {return m.theme !== 'Company'}).map(function(item) {
					type = item.subMenus.length > 0 ? 'toggle' : 'link';
					icon = 'tn-icon tn-menu-link-icon icon-icon_' + item.component;
					subMenus = buildPages(item.subMenus.filter( function(obj){ return obj.type !== 'Widget'}));

					// TODO: add the missing URL in the API
					if (item.menuId === 5 && item.url === null) {
						item.url = 'app.main.timeoff';
					}
					if (item.menuId === 6 && item.url === null) {
						item.url = 'app.main.company';
					}

					// direct main menu to the first child menu
					firstChildMenu = item.subMenus[0];
					if (firstChildMenu && firstChildMenu.type === 'Menu') {
						item.url = firstChildMenu.url;
					}

					var returnObj =  {
						id   	 : item.menuId,
						// identify the main menus
						isMainMenu: true,
						isActive : item.menuId === 1 ? true : false,
						type     : type,
						text     : item.name,
						theme    : item.theme,
						icon     : icon,
						url      : item.url || '#',
						target   : item.external === 'Y' ? '_blank' : ''
					};

					if (subMenus){
						returnObj.menus = subMenus;
					}
					else {
						returnObj.type = 'link';
					}
					return returnObj;
				});
			}
		}
	});
}

/*
 function MenuService(DS) {
 return DS.defineResource({
 name: 'menu',
 idAttribute: 'id',
 basePath: 'assets/json',
 endpoint: 'menu.json',
 deserialize: function(resourceConfig, data) {
 var json = data.data;
 return json.data;
 }
 });
 }
 */

function buildPages(data) {
	var subMenus;

	if (data && angular.isArray(data) && data.length > 0) {
		subMenus = data.map(function(item) {
			return {
				id  : item.menuId,
				text    : item.name,
				url     : item.url,
				theme   : item.theme,
				target  : item.external === 'Y' ? '_blank' : '',
				type  : item.type
			};
		});
	}
	return subMenus;
}
