require('script-loader!jquery/dist/jquery');
require('script-loader!handlebars/handlebars');
require('ember/ember');

console.log(require('./app').create());
