const appmodule = require('ember-loader?path=.!.');

appmodule.Resolver = Ember.DefaultResolver.extend({
  resolveTemplate: function(parsedName) {
    var templatePath = parsedName.fullNameWithoutType.replace(/\./g, '/');
    var template = this.namespace.TEMPLATES[templatePath];
    if (!template) {
      template = this._super(parsedName);
    }
    return template;
  },
});

exports = module.exports = Ember.Application.extend(appmodule);

exports.initializer({
  name: 'router',
  initialize: function(container, application) {
    if (Array.isArray(appmodule.ROUTING)) {
      appmodule.ROUTING.forEach(application.Router.map);
    } else if (application.ROUTING) {
      application.Router.map(appmodule.ROUTING);
    }
  }
});

if (appmodule.INITIALIZERS) {
  Object.keys(appmodule.INITIALIZERS).forEach(function(key) {
    exports.initializer(appmodule.INITIALIZERS[key]);
  });
}
