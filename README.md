# GS2

## Setup

- Run `npm install` to install all project required modules

- Install EditorConfig (http://editorconfig.org)
  Review the included .editorconfig
- Setup Reverse Proxy to use remote APIs
  https://confluence.trinet-devops.com/pages/viewpage.action?pageId=63453200&moved=true

## Development

In Terminal, run these commands:

- Run `npm run serve` to start a local site in dev mode
- Run `npm run serve:dist` to start a local site in distribution mode
- Run `npm run test` to execute all unit tests once
- Run `npm run test:auto` to start PhantomJs and watch unit-test changes

## Folder Structure and Module Name Guidelines

In general:

- organize the files using folder-by-feature structure
- use shorter and descriptive file name and folder names
- use longer module name e.g. 'trinet.app.login', 'trinet.app.benefits'

Again, feel free to break these rules with justified reason.

Here is a proposed example of folder structure and module names:

### 'src/app' Folder

folder tree                       module name
----------------------------------------------------------------------
- app.js                          trinet.app

- login
  - login.js                      trinet.app.login
  - login.html
  - login.spec.js
  - login.scss
  - login.service.js

- logout
  - logout.js                     trinet.app.logout
  - logout.html
  - logout.spec.js
  - logout.scss
  - logout.service.js

- dashboard
  - dashboard.js                  trinet.app.dashboard
  - dashboard.html
  - dashboard.spec.js
  - dashboard.scss
  - wse
    - wse.js                      trinet.app.dashboard.wse
    - wse.html
    - wse.scss
    - wse.spec.js
  - company
    - company.js                  trinet.app.dashboard.company
    - company.html
    - company.scss
    - company.spec.js

- benefits
  - benefits.js                   trinet.app.benefits
  - benefits.html
  - benefits.spec.js
  - benefits.scss
  - benefits.service.js
  - resource
    - resource.js                 trinet.app.benefits.resource
    - resource.html
    - resource.spec.js
    - resource.scss

### 'src/core' Folder

folder tree                       module name
----------------------------------------------------------------------
- core.js                         trinet.core

- components                      trinet.core.components
  - autocomplete                  trinet.core.components.tnAutocomplete
  - button
  - card
    - card.js
    - card.scss
    - card.spec.js
  - checkbox
  - chips
  - colors
  - content
  - datepicker
  - dialog
  - icon
    - icon.js
    - icon.scss
    - icon.spec.js
    - js
      - iconDirective.js
      - iconService.js
  - input
  - menu
  - menuLink
    - menu-link.js                trinet.core.components.tnMenuLink
    - menu-link.spec.js
    - menu-link.scss
    - menu-link.theme.scss
    - mneu-link.html
    - demo                        show the basic usage
      - index.html
      - readme.html
      - script.js
      - style.css
      - img

- services                        trinet.core.services
  - theming
  - layout
    - layout.js
    - layout.scss
  - gesture
  - registry

- styles                          trinet.core.styles
  - layout.scss
  - mixins.scss
  - structure.scss
  - themes.scss
  - typography.scss
  - variables.scss

- util                            trinet.core.util
  - autofocus.js
  - color.js
  - constant.js
  - media.js
  - prefixer.js
  - util.js
  
### JS-DATA
https://confluence.trinet-devops.com/display/GS/Using+js-data+with+AngularJS


### How to setup local cookie
Create a folder src/microservices-config
Create a config.json
Add the following properties based on your env.
{
 "cookieName" : "TriNetAuthCookieBIB",
 "hrpUrl" : "https://hrpbib.hrpassport.com",
 "ssoUrl" : "https://ssobib.trinet.com",
 "platformUrl" : "https://platformbib.hrpassport.com",
"validateAllSessions" : true
}

### local development, make validateAllSessions to false, otherwise, you will be logged out.
"validateAllSessions" : false 

