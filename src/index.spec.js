// require all `project/src/components/**/*.spec.js`

var context = require.context('./app/main/company/forms-and-policies', true, /\.spec.js$/);
context.keys().forEach(context);

// require all `project/src/components/**/main.js`
var  componentsContext = require.context('.', true, /main\.js$/);
componentsContext.keys().forEach(componentsContext);
